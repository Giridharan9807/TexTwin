"""
TexTwin AI
Failure Risk Engine

This module estimates the probability of machine failure
using machine health prediction and live sensor values.
"""


class FailureRiskEngine:
    """
    Estimates machine failure risk (0–100%)
    """

    def __init__(self):
        pass

    def predict(
        self,
        status: str,
        confidence: float,
        temperature: float,
        vibration: float,
        rpm: float,
        humidity: float,
        power: float,
        running_hours: float,
    ):

        # -------------------------
        # Base Risk
        # -------------------------

        base_risk = {
            "Running": 5,
            "Maintenance": 40,
            "Critical": 80,
            "Stopped": 100,
        }.get(status, 50)

        risk = float(base_risk)

        # -------------------------
        # Temperature
        # -------------------------

        if temperature > 90:
            risk += 20
        elif temperature > 70:
            risk += 10

        # -------------------------
        # Vibration
        # -------------------------

        if vibration > 8:
            risk += 25
        elif vibration > 5:
            risk += 15

        # -------------------------
        # RPM
        # -------------------------

        if rpm > 2500:
            risk += 5

        # -------------------------
        # Power
        # -------------------------

        if power > 8:
            risk += 10

        # -------------------------
        # Running Hours
        # -------------------------

        if running_hours > 10000:
            risk += 20
        elif running_hours > 5000:
            risk += 10

        # -------------------------
        # Confidence Adjustment
        # -------------------------

        if confidence < 70:
            risk += 15
        elif confidence < 85:
            risk += 8

        # -------------------------
        # Clamp
        # -------------------------

        risk = max(0, min(100, risk))

        # -------------------------
        # Risk Level
        # -------------------------

        if risk <= 20:
            level = "Low"

        elif risk <= 50:
            level = "Moderate"

        elif risk <= 80:
            level = "High"

        else:
            level = "Critical"

        return {
            "failureRisk": round(risk, 2),
            "riskLevel": level,
        }