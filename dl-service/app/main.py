import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import modul internal yang sudah kita buat
from app.core.config import settings
from app.core.model_manager import model_manager
from app.api.endpoints import router as api_router

# Konfigurasi logging agar info dari model_manager terlihat di terminal
logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── [STARTUP] ─────────────────────────────────────────────────────────────
    # Memuat file .pkl ke dalam RAM saat server pertama kali dijalankan
    model_manager.load_artifacts(
        model_path=settings.MODEL_PATH,
        config_path=settings.CONFIG_PATH
    )
    yield
    # ── [SHUTDOWN] ────────────────────────────────────────────────────────────
    # Membersihkan memori saat server dimatikan (praktik yang baik)
    model_manager.model = None
    model_manager.config = None

# Inisialisasi aplikasi FastAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Prediksi hourly rate freelancer IT + rekomendasi skill & pekerjaan. CC26-PSU219.",
    version=settings.VERSION,
    lifespan=lifespan
)

# Konfigurasi CORS (Cross-Origin Resource Sharing)
# Mengizinkan frontend/backend Express Anda untuk menembak API ini
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], # Di production, bisa diganti domain spesifik misal ["https://domainanda.com"]
    allow_methods=["*"], 
    allow_headers=["*"]
)

# Mendaftarkan rute dari file endpoints.py
app.include_router(api_router)
