from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, func
from sqlalchemy.dialects.postgresql import JSONB
from pgvector.sqlalchemy import Vector
from app.core.database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True) # GitHub User ID
    github_username = Column(String, index=True)
    status = Column(String, default='generating')  # generating, ready, failed
    template_id = Column(String, nullable=True)
    custom_prompt = Column(Text, nullable=True)
    deployment_url = Column(String, nullable=True)
    config = Column(JSONB, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class WebPage(Base):
    """Stores the generated web pages for the portfolio"""
    __tablename__ = "web_pages"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, index=True)
    file_path = Column(String) # e.g., 'app/page.tsx'
    content = Column(Text)
    file_type = Column(String, nullable=True)  # tsx, css, json
    version = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)
    vector = Column(Vector(1024), nullable=True) # Embedding of the content

class CodeSnippet(Base):
    """Stores reusable code snippets for portfolio generation"""
    __tablename__ = "code_snippets"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)  # component, layout, style, animation, seo
    subcategory = Column(String, index=True)  # hero, navbar, card, footer, etc.
    code = Column(Text)
    description = Column(Text)
    tags = Column(JSONB, default=[])  # ["react", "tailwind", "responsive"]
    framework = Column(String, default="nextjs")  # nextjs, react, vue
    vector = Column(Vector(1024))
    usage_count = Column(Integer, default=0)
    quality_score = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class CodeContext(Base):
    """Stores general knowledge base/snippets for the AI"""
    __tablename__ = "code_context"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    metadata_ = Column(JSONB)
    vector = Column(Vector(1024))
