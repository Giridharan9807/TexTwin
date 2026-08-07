"""
TexTwin AI Predictor
"""

from .loader import load_model
from .preprocessor import prepare_input
from .validator import validate_input
from .logger import logger
class TMHPPredictor:

    def __init__(self):

        self.model, self.encoder = load_model()

    def predict(self, sensor_data: dict):

        validate_input(sensor_data)
        logger.info("Prediction Started")
        sample = prepare_input(sensor_data)

        prediction = self.model.predict(sample)[0]

        status = self.encoder.inverse_transform([prediction])[0]

        confidence = float(max(self.model.predict_proba(sample)[0]) * 100)
        logger.info(f"Prediction = {status} ({round(confidence,2)}%)")
        return {
            "status": status,
            "confidence": round(confidence, 2)
        }