from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.models import CodeContext
from app.services.llm_service import llm_service

class VectorService:
    @staticmethod
    async def ingest_code(session: AsyncSession, content: str, metadata: dict = None):
        """
        Ingest code content, create embedding, and save to DB.
        """
        embedding = await llm_service.get_embedding(content)
        if not embedding:
            return None

        # Chunking strategy could be added here (omitted for brevity)
        
        doc = CodeContext(
            content=content,
            metadata_=metadata or {},
            vector=embedding
        )
        session.add(doc)
        await session.commit()
        return doc

    @staticmethod
    async def search_similar(session: AsyncSession, query: str, limit: int = 5):
        """
        Search for similar code snippets using cosine similarity.
        """
        query_embedding = await llm_service.get_embedding(query)
        if not query_embedding:
            return []

        # pgvector l2_distance or cosine_distance
        # Note: syntax depends on pgvector version, usually .l2_distance(vector)
        stmt = select(CodeContext).order_by(
            CodeContext.vector.l2_distance(query_embedding)
        ).limit(limit)

        result = await session.execute(stmt)
        return result.scalars().all()

vector_service = VectorService()
