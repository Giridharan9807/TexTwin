import pandas as pd

from textwin_ai.analytics.machine_ranking import MachineRanking

df = pd.read_csv("reports/prediction_results.csv")

engine = MachineRanking()

print("\nTop 5 Healthy Machines\n")
print(engine.top_healthy(df, 5)[["status", "healthScore", "failureRisk"]])

print("\nTop 5 Critical Machines\n")
print(engine.top_critical(df, 5)[["status", "healthScore", "failureRisk"]])