import pandas as pd

from textwin_ai.dashboard import DashboardGenerator

df = pd.read_csv("reports/prediction_results.csv")

dashboard = DashboardGenerator()

result = dashboard.generate_dashboard(df)

print(result["summary"])

print()

print(result["topHealthy"][0])

print()

print(result["topCritical"][0])

print()

print("Machines:", len(result["machines"]))