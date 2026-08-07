"""
TexTwin AI
Machine Ranking Engine
"""

import pandas as pd


class MachineRanking:

    def top_healthy(self, df: pd.DataFrame, top_n=10):
        return (
            df.sort_values("healthScore", ascending=False)
            .head(top_n)
            .reset_index(drop=True)
        )

    def top_critical(self, df: pd.DataFrame, top_n=10):
        return (
            df.sort_values("healthScore", ascending=True)
            .head(top_n)
            .reset_index(drop=True)
        )