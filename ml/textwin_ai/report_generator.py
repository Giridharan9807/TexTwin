"""
TexTwin AI
Report Generator

Combines outputs from all AI modules into
a single prediction report.
"""

from textwin_ai.predictor import TMHPPredictor
from textwin_ai.failure_risk import FailureRiskEngine
from textwin_ai.health_score import HealthScoreEngine
from textwin_ai.root_cause import RootCauseEngine
from textwin_ai.rul import RULEngine
from textwin_ai.recommendation import RecommendationEngine


class TexTwinAI:

    def __init__(self):

        self.predictor = TMHPPredictor()

        self.failure = FailureRiskEngine()

        self.health = HealthScoreEngine()

        self.root = RootCauseEngine()

        self.rul = RULEngine()

        self.recommendation = RecommendationEngine()

    def predict(
        self,
        temperature,
        vibration,
        rpm,
        humidity,
        power,
        running_hours,
    ):

        # -----------------------------
        # Machine Health Prediction
        # -----------------------------

        sensor_data = {
    "Temperature": temperature,
    "Vibration": vibration,
    "RPM": rpm,
    "Humidity": humidity,
    "Power": power,
    "Running_Hours": running_hours,
}

        result = self.predictor.predict(sensor_data)

        status = result["status"]
        confidence = result["confidence"]

        # -----------------------------
        # Failure Risk
        # -----------------------------

        failure = self.failure.predict(
            status,
            confidence,
            temperature,
            vibration,
            rpm,
            humidity,
            power,
            running_hours,
        )

        # -----------------------------
        # Health Score
        # -----------------------------

        health = self.health.predict(
            failure["failureRisk"],
            temperature,
            vibration,
            rpm,
            humidity,
            power,
            running_hours,
        )

        # -----------------------------
        # Root Cause
        # -----------------------------

        root = self.root.predict(
            temperature,
            vibration,
            rpm,
            humidity,
            power,
            running_hours,
        )

        # -----------------------------
        # Remaining Useful Life
        # -----------------------------

        rul = self.rul.predict(
            health["healthScore"],
            failure["failureRisk"],
            running_hours,
        )

        # -----------------------------
        # Recommendation
        # -----------------------------

        recommendation = self.recommendation.predict(
            status,
            failure["failureRisk"],
            health["healthScore"],
            temperature,
            vibration,
            rpm,
            power,
            running_hours,
        )

        # -----------------------------
        # Final Report
        # -----------------------------

        return {

            **result,

            **failure,

            **health,

            **root,

            **rul,

            **recommendation,

        }