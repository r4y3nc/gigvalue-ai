from fastapi import APIRouter, HTTPException
from app.api.schemas import PredictRequest
from app.services.inference import predict_hourly_rate
from app.services.constants import JOB_SUGGESTIONS

router = APIRouter()

# ── [ENDPOINT 1] Health check ─────────────────────────────────────────────────
@router.get("/health")
def health():
    return {
        "status": "ok", 
        "model": "Deep Learning (.keras)", 
        "version": "2.0.0",
        "features": ["predict", "rating_description", "skill_recommendations", "job_suggestions"]
    }

# ── [ENDPOINT 2] Prediksi (response sekarang include 3 fitur baru) ────────────
@router.post("/model/predict")
def predict(req: PredictRequest):
    try:
        result = predict_hourly_rate(
            description         = req.description,
            skills              = req.skills,
            category            = req.category,
            country             = req.country,
            experience          = req.experience,
            client_rating       = req.client_rating,
            client_review_count = req.client_review_count,
        )
        
        if result.get("status") == "error":
            raise HTTPException(status_code=422, detail=result["message"])
            
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── [ENDPOINT 3] Semua role + job suggestions (untuk halaman utama) ───────────
@router.get("/api/suggestions")
def all_suggestions():
    return {
        "roles": list(JOB_SUGGESTIONS.keys()), 
        "suggestions": JOB_SUGGESTIONS
    }

# ── [ENDPOINT 4] Job suggestions per role (untuk search/suggestion teks) ──────
@router.get("/api/suggestions/{role}")
def suggestions_by_role(role: str):
    role_lower = role.lower()
    matched = next((r for r in JOB_SUGGESTIONS if r.lower() == role_lower or role_lower in r.lower()), None)
    
    if not matched:
        return {
            "role": role, 
            "matched": False, 
            "suggestions": JOB_SUGGESTIONS["Other"]
        }
        
    return {
        "role": matched, 
        "matched": True, 
        "suggestions": JOB_SUGGESTIONS[matched]
    }

