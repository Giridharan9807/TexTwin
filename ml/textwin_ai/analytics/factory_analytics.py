"""
TexTwin AI
Factory Analytics Engine
"""

import pandas as pd


class FactoryAnalytics:

    def summarize(self, df: pd.DataFrame):

        total = len(df)

        running = (df["status"] == "Running").sum()

        maintenance = (df["status"] == "Maintenance").sum()

        critical = (df["status"] == "Critical").sum()

        stopped = (df["status"] == "Stopped").sum()

        return {

            "totalMachines": total,

            "running": int(running),

            "maintenance": int(maintenance),

            "critical": int(critical),

            "stopped": int(stopped),

            "averageHealthScore": float(round(df["healthScore"].mean(), 2)),
            "averageFailureRisk": float(round(df["failureRisk"].mean(), 2)),
            "averageConfidence": float(round(df["confidence"].mean(), 2))

        }