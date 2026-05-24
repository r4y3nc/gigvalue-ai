import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings:
    PROJECT_NAME: str = "GigValue AI — Model Server"
    VERSION: str = "2.0.0"
    MODEL_PATH: str = os.getenv(
        "MODEL_PATH",
        os.path.join(BASE_DIR, "app", "models", "gigvalue_sgd_tuned.pkl")
    )
    CONFIG_PATH: str = os.getenv(
        "CONFIG_PATH",
        os.path.join(BASE_DIR, "app", "models", "model_config.pkl")
    )

settings = Settings()
