"""
TexTwin AI
Health Score Engine

Calculates an overall machine health score
using failure risk and sensor values.
"""


class HealthScoreEngine:
    """
    Calculates Machine Health Score (0-100)
    """

    def __init__(self):
        pass

    def predict(
        self,
        failure_risk: float,
        temperature: float,
        vibration: float,
        rpm: float,
        humidity: float,
        power: float,
        running_hours: float,
    ):

        # ---------------------------------
        # Base Score
        # ---------------------------------

        score = 100 - failure_risk

        # ---------------------------------
        # Temperature
        # ---------------------------------

        if temperature > 90:
            score -= 15
        elif temperature > 70:
            score -= 8

        # ---------------------------------
        # Vibration
        # ---------------------------------

        if vibration > 8:
            score -= 15
        elif vibration > 5:
            score -= 8

        # ---------------------------------
        # RPM
        # ---------------------------------

        if rpm > 2500:
            score -= 3

        # ---------------------------------
        # Power
        # ---------------------------------

        if power > 8:
            score -= 5

        # ---------------------------------
        # Running Hours
        # ---------------------------------

        if running_hours > 10000:
            score -= 10
        elif running_hours > 5000:
            score -= 5

        # ---------------------------------
        # Humidity
        # ---------------------------------

        if humidity > 85:
            score -= 3

        # ---------------------------------
        # Clamp Score
        # ---------------------------------

        score = max(0, min(100, score))

        # ---------------------------------
        # Health Level
        # ---------------------------------

        if score >= 90:
            level = "Excellent"

        elif score >= 75:
            level = "Good"

        elif score >= 50:
            level = "Fair"

        elif score >= 25:
            level = "Poor"

        else:
            level = "Critical"

        return {
            "healthScore": round(score, 2),
            "healthLevel": level,
        }