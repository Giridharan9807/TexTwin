from textwin_ai.learning.factory_simulator import FactorySimulator

factory = FactorySimulator(machines=100)

for _ in range(500):
    df = factory.step()

print(df.head())

print()

print(df["status"].value_counts())

print()

print("Average Health:", round(df["Health"].mean(), 2))