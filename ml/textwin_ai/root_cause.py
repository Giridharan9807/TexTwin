"""
TexTwin AI
Root Cause Analysis Engine

Explains the most likely reason for
machine degradation using sensor values.
"""


class RootCauseEngine:

    def __init__(self):
        pass

    def predict(
        self,
        temperature,
        vibration,
        rpm,
        humidity,
        power,
        running_hours,
    ):

        causes = []

        # Temperature
        if temperature > 90:
            causes.append("Extreme machine temperature")

        elif temperature > 70:
            causes.append("High operating temperature")

        # Vibration
        if vibration > 8:
            causes.append("Excessive vibration")

        elif vibration > 5:
            causes.append("High vibration")

        # RPM
        if rpm > 2500:
            causes.append("High rotational speed")

        # Power
        if power > 8:
            causes.append("High power consumption")

        # Humidity
        if humidity > 85:
            causes.append("High environmental humidity")

        # Running Hours
        if running_hours > 10000:
            causes.append("Machine nearing end of service life")

        elif running_hours > 5000:
            causes.append("Machine aging")

        # Final Result
        if not causes:

            return {
                "rootCause": "No abnormal operating condition detected."
            }

        return {
            "rootCause": ", ".join(causes)
        }