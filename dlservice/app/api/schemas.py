from pydantic import BaseModel
from typing import Optional

class PredictRequest(BaseModel):
    description: str
    skills: Optional[str] = ""
    category: Optional[str] = "unknown"
    country: Optional[str] = "unknown"
    experience: Optional[str] = "unknown"
    client_rating: Optional[float] = 0.0
    client_review_count: Optional[int] = 0
