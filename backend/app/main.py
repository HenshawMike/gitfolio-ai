from fastapi import FastAPI
from app.core.config import settings
from app.api.routes import router as api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "GitFolio AI Backend is running"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
