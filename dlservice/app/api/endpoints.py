from fastapi import APIRouter, HTTPException
from app.api.schemas import PredictRequest
from app.services.inference import predict_hourly_rate

router = APIRouter()

# [ENDPOINT 1] Health check
@router.get("/health")
def health():
    return {
        "status": "ok",
        "service": "GigValue AI - Deep Learning Service",
        "model": "Deep Learning (.keras)",
        "version": "1.0.0"
    }

# [ENDPOINT 2] Prediksi
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
