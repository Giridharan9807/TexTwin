import pandas as pd

from textwin_ai.analytics.factory_analytics import FactoryAnalytics

df = pd.read_csv("reports/prediction_results.csv")

engine = FactoryAnalytics()

print(engine.summarize(df))