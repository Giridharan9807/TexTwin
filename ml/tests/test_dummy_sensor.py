from textwin_ai.learning.dummy_sensor import DummySensorGenerator

generator = DummySensorGenerator(n_samples=20)

df = generator.generate()

print(df.head())

print()

print(df["status"].value_counts())

generator.save("learning_data/incoming/new_sensor_data.csv")

print("\nDataset Saved Successfully!")