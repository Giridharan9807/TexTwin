from textwin_ai.learning.dataset_manager import DatasetManager

manager = DatasetManager()

result = manager.update(
    "learning_data/incoming/latest_sensor_data.csv"
)

print(result)