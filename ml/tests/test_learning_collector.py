from textwin_ai.learning.collector import LearningCollector

collector = LearningCollector()

df = collector.update(
    "learning_data/incoming/new_sensor_data.csv"
)

print(df.head())

print()

print("Total Records:", len(df))