from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class GenerateRequest(BaseModel):
    github_username: str
    template_id: Optional[str] = "minimal"
    custom_prompt: Optional[str] = None
    repo_urls: List[str] = []

class FileObject(BaseModel):
    filename: str
    content: str

class GenerateResponse(BaseModel):
    message: str
    portfolio_id: int
    preview_url: Optional[str] = None
    files: List[FileObject] = []

class ChatRequest(BaseModel):
    portfolio_id: int
    message: str
    context_files: List[str] = []

class ChatResponse(BaseModel):
    reply: str
    files: List[FileObject] = []
