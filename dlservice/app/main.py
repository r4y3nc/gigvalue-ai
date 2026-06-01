import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.model_manager import model_manager
from app.api.endpoints import router as api_router

logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    model_manager.load_artifacts(
        model_path=settings.MODEL_PATH,
        config_path=settings.CONFIG_PATH
    )
    yield
    model_manager.model = None
    model_manager.config = None

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Prediksi hourly rate freelancer IT & rekomendasi skill. CC26-PSU219.",
    version=settings.VERSION,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(api_router)
