from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.schemas import GenerateRequest, GenerateResponse, ChatRequest, ChatResponse, FileObject
from app.models.models import Portfolio, WebPage
from app.services.llm_service import llm_service
from app.services.vector_service import vector_service
from app.services.snippet_service import snippet_service
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# Snippet Search Schema
class SnippetSearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    limit: int = 5

class SnippetResponse(BaseModel):
    id: int
    name: str
    category: str
    subcategory: str
    code: str
    description: str
    tags: List[str]

@router.post("/generate", response_model=GenerateResponse)
async def generate_portfolio(request: GenerateRequest, db: AsyncSession = Depends(get_db)):
    """
    Generate a new portfolio based on GitHub data and prompt.
    """
    # 1. Create Portfolio Entry
    portfolio = Portfolio(
        user_id=request.github_username,
        github_username=request.github_username,
        template_id=request.template_id,
        custom_prompt=request.custom_prompt,
        status='generating'
    )
    db.add(portfolio)
    await db.flush() # Get ID
    
    # 2. Search for relevant code snippets
    snippet_query = f"{request.template_id} portfolio {request.custom_prompt or ''}"
    relevant_snippets = await snippet_service.search_snippets(db, snippet_query, limit=3)
    
    # 3. Build context from snippets
    snippet_context = "\n\n".join([
        f"Example {i+1} ({s.name}):\n{s.code}" 
        for i, s in enumerate(relevant_snippets)
    ])
    
    # 4. Generate Code with snippet context
    prompt = f"Generate a portfolio for {request.github_username}. "
    if request.custom_prompt:
        prompt += f"User request: {request.custom_prompt}"
        
    generated_files = await llm_service.generate_code(prompt, context=snippet_context)
    
    file_objects = []
    
    # 5. Save Files to DB
    for file_data in generated_files:
        filename = file_data.get("filename")
        content = file_data.get("content")
        
        if filename and content:
            web_page = WebPage(
                portfolio_id=portfolio.id,
                file_path=filename,
                content=content,
                file_type=filename.split('.')[-1] if '.' in filename else None
            )
            db.add(web_page)
            file_objects.append(FileObject(filename=filename, content=content))
    
    # Update portfolio status
    portfolio.status = 'ready'
    await db.commit()
    
    return GenerateResponse(
        message="Portfolio generated successfully",
        portfolio_id=portfolio.id,
        preview_url=f"/preview?id={portfolio.id}",
        files=file_objects
    )

@router.post("/chat", response_model=ChatResponse)
async def chat_edit(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    """
    Chat with the AI to edit the portfolio.
    """
    # 1. Fetch Context (Existing Files)
    stmt = select(WebPage).where(WebPage.portfolio_id == request.portfolio_id)
    result = await db.execute(stmt)
    existing_files = result.scalars().all()
    
    context_str = ""
    for file in existing_files:
        context_str += f"Filename: {file.file_path}\nContent:\n{file.content}\n\n"
    
    # 2. Search for relevant snippets based on user message
    relevant_snippets = await snippet_service.search_snippets(db, request.message, limit=2)
    snippet_context = "\n\n".join([
        f"Reference ({s.name}):\n{s.code}" 
        for s in relevant_snippets
    ])
    
    full_context = f"{context_str}\n\nRelevant Examples:\n{snippet_context}"
        
    # 3. Generate Changes
    generated_files = await llm_service.generate_code(request.message, context=full_context)
    
    file_objects = []
    
    # 4. Update DB
    for file_data in generated_files:
        filename = file_data.get("filename")
        content = file_data.get("content")
        
        if filename and content:
            web_page = WebPage(
                portfolio_id=request.portfolio_id,
                file_path=filename,
                content=content
            )
            db.add(web_page)
            file_objects.append(FileObject(filename=filename, content=content))
            
    await db.commit()
    
    return ChatResponse(
        reply="Changes applied successfully",
        files=file_objects
    )

@router.post("/snippets/search", response_model=List[SnippetResponse])
async def search_snippets(request: SnippetSearchRequest, db: AsyncSession = Depends(get_db)):
    """
    Search for code snippets using semantic search.
    """
    snippets = await snippet_service.search_snippets(
        db, 
        request.query, 
        category=request.category,
        limit=request.limit
    )
    
    return [
        SnippetResponse(
            id=s.id,
            name=s.name,
            category=s.category,
            subcategory=s.subcategory,
            code=s.code,
            description=s.description,
            tags=s.tags or []
        )
        for s in snippets
    ]
