"""
TexTwin AI
Remaining Useful Life (RUL) Engine

Estimates the remaining useful life
of a machine based on sensor values
and health metrics.
"""


class RULEngine:

    def __init__(self):
        pass

    def predict(
        self,
        health_score: float,
        failure_risk: float,
        running_hours: float,
    ):

        # -------------------------
        # Assume design life
        # -------------------------

        DESIGN_LIFE_HOURS = 20000

        remaining_hours = max(
            0,
            DESIGN_LIFE_HOURS - running_hours
        )

        # -------------------------
        # Health Adjustment
        # -------------------------

        health_factor = health_score / 100

        risk_factor = (100 - failure_risk) / 100

        adjusted_hours = remaining_hours * health_factor * risk_factor

        # -------------------------
        # Convert Hours → Days
        # -------------------------

        remaining_days = adjusted_hours / 24

        # -------------------------
        # Remaining Life Level
        # -------------------------

        if remaining_days > 180:
            level = "Excellent"

        elif remaining_days > 90:
            level = "Good"

        elif remaining_days > 30:
            level = "Warning"

        else:
            level = "Critical"

        return {

            "remainingHours": round(adjusted_hours, 2),

            "remainingDays": round(remaining_days, 2),

            "lifeLevel": level

        }