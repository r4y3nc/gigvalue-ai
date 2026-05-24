import logging
import pickle
from typing import Any, Dict, Optional

logger = logging.getLogger("ml_service.model_manager")

class ModelManager:
    def __init__(self) -> None:
        self.model: Optional[Any] = None
        self.config: Optional[Dict[str, Any]] = None

    def load_artifacts(self, model_path: str, config_path: str) -> None:
        try:
            with open(model_path, "rb") as model_file:
                self.model = pickle.load(model_file)
            with open(config_path, "rb") as config_file:
                self.config = pickle.load(config_file)

            if self.config and "metrics" in self.config:
                m = self.config["metrics"]
                logger.info(f"Model loaded: {model_path.split('/')[-1]} | MAE: {m.get('MAE')} | RMSE: {m.get('RMSE')} | R2: {m.get('R2')}")
        except Exception as e:
            logger.critical(f"Failed to load model artifacts: {str(e)}")
            raise e

model_manager = ModelManager()
