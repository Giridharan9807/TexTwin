"""
TexTwin AI
Smart Maintenance Recommendation Engine
"""


class RecommendationEngine:

    def __init__(self):
        pass

    def predict(
        self,
        status: str,
        failure_risk: float,
        health_score: float,
        temperature: float,
        vibration: float,
        rpm: float,
        power: float,
        running_hours: float,
    ):

        recommendation = []
        priority = "Low"
        maintenance_type = "Preventive"

        # -----------------------
        # Temperature
        # -----------------------

        if temperature > 90:
            recommendation.append(
                "Inspect cooling system immediately."
            )
            priority = "Critical"

        elif temperature > 70:
            recommendation.append(
                "Check machine cooling efficiency."
            )

        # -----------------------
        # Vibration
        # -----------------------

        if vibration > 8:
            recommendation.append(
                "Replace bearing and inspect shaft alignment."
            )
            priority = "Critical"

        elif vibration > 5:
            recommendation.append(
                "Inspect bearing lubrication."
            )

        # -----------------------
        # Power
        # -----------------------

        if power > 8:
            recommendation.append(
                "Inspect electrical load."
            )

        # -----------------------
        # Running Hours
        # -----------------------

        if running_hours > 10000:
            recommendation.append(
                "Schedule complete preventive maintenance."
            )

        elif running_hours > 5000:
            recommendation.append(
                "Plan routine maintenance."
            )

        # -----------------------
        # Health Score
        # -----------------------

        if health_score < 40:
            priority = "Critical"

        elif health_score < 70 and priority != "Critical":
            priority = "High"

        # -----------------------
        # Failure Risk
        # -----------------------

        if failure_risk > 80:
            priority = "Critical"

        elif failure_risk > 50 and priority != "Critical":
            priority = "High"

        # -----------------------
        # Status
        # -----------------------

        if status == "Stopped":
            maintenance_type = "Emergency"

        elif status == "Critical":
            maintenance_type = "Corrective"

        elif status == "Maintenance":
            maintenance_type = "Preventive"

        if not recommendation:
            recommendation.append(
                "Machine operating normally. Continue monitoring."
            )

        return {

            "recommendation": recommendation,

            "priority": priority,

            "maintenanceType": maintenance_type

        }