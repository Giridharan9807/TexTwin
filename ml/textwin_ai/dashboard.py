"""
TexTwin AI Dashboard Generator
"""

from textwin_ai.analytics.factory_analytics import FactoryAnalytics
from textwin_ai.analytics.machine_ranking import MachineRanking


class DashboardGenerator:

    def __init__(self):
        self.analytics = FactoryAnalytics()
        self.ranking = MachineRanking()

    def generate_dashboard(self, df):

        summary = self.analytics.summarize(df)

        top_healthy = (
            self.ranking
            .top_healthy(df, 5)
            .to_dict(orient="records")
        )

        top_critical = (
            self.ranking
            .top_critical(df, 5)
            .to_dict(orient="records")
        )

        machines = df[
    [
        "status",
        "confidence",
        "healthScore",
        "failureRisk"
    ]
].to_dict(orient="records")

        return {
            "summary": summary,
            "topHealthy": top_healthy,
            "topCritical": top_critical,
            "machines": machines
        }