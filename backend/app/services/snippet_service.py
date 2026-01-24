from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.models import CodeSnippet
from app.services.llm_service import llm_service
from typing import List, Optional

class SnippetService:
    @staticmethod
    async def ingest_snippet(
        session: AsyncSession,
        name: str,
        category: str,
        subcategory: str,
        code: str,
        description: str,
        tags: List[str] = None,
        framework: str = "nextjs"
    ) -> CodeSnippet:
        """
        Ingest a code snippet with embedding generation.
        """
        # Generate embedding from code + description
        embedding_text = f"{name}\n{description}\n{code}"
        embedding = await llm_service.get_embedding(embedding_text)
        
        if not embedding:
            raise ValueError("Failed to generate embedding")
        
        snippet = CodeSnippet(
            name=name,
            category=category,
            subcategory=subcategory,
            code=code,
            description=description,
            tags=tags or [],
            framework=framework,
            vector=embedding,
            quality_score=0.5  # Default, can be updated based on usage
        )
        
        session.add(snippet)
        await session.commit()
        await session.refresh(snippet)
        return snippet
    
    @staticmethod
    async def search_snippets(
        session: AsyncSession,
        query: str,
        category: Optional[str] = None,
        limit: int = 5
    ) -> List[CodeSnippet]:
        """
        Semantic search for code snippets.
        """
        # Generate query embedding
        query_embedding = await llm_service.get_embedding(query)
        if not query_embedding:
            return []
        
        # Build query
        stmt = select(CodeSnippet).order_by(
            CodeSnippet.vector.l2_distance(query_embedding)
        )
        
        # Filter by category if provided
        if category:
            stmt = stmt.where(CodeSnippet.category == category)
        
        stmt = stmt.limit(limit)
        
        result = await session.execute(stmt)
        snippets = result.scalars().all()
        
        # Update usage count
        for snippet in snippets:
            snippet.usage_count += 1
        await session.commit()
        
        return snippets
    
    @staticmethod
    async def get_by_category(
        session: AsyncSession,
        category: str,
        subcategory: Optional[str] = None,
        limit: int = 10
    ) -> List[CodeSnippet]:
        """
        Get snippets by category/subcategory.
        """
        stmt = select(CodeSnippet).where(CodeSnippet.category == category)
        
        if subcategory:
            stmt = stmt.where(CodeSnippet.subcategory == subcategory)
        
        stmt = stmt.order_by(CodeSnippet.quality_score.desc()).limit(limit)
        
        result = await session.execute(stmt)
        return result.scalars().all()

snippet_service = SnippetService()
