from pydantic import BaseModel, Field
from typing import Optional

class PredictRequest(BaseModel):
    description: str = Field(..., min_length=20)

    skills: Optional[str] = ""
    category: Optional[str] = "unknown"
    country: Optional[str] = "unknown"
    experience: Optional[str] = "unknown"

    client_rating: Optional[float] = Field(
        default=0.0,
        ge=0.0,
        le=5.0
    )

    client_review_count: Optional[int] = Field(
        default=0,
        ge=0
    )
