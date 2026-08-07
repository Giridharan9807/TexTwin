"""
TexTwin AI
Smart Dummy Sensor Generator
"""

import random
import pandas as pd


class DummySensorGenerator:

    def __init__(self, n_samples=1000):
        self.n_samples = n_samples

    def generate(self):

        data = []

        for _ in range(self.n_samples):

            state = random.choice([
                "Running",
                "Maintenance",
                "Critical",
                "Stopped"
            ])

            if state == "Running":

                row = {
                    "Temperature": round(random.uniform(25, 45), 2),
                    "Vibration": round(random.uniform(0.5, 2), 2),
                    "RPM": random.randint(1200, 1800),
                    "Humidity": round(random.uniform(40, 65), 2),
                    "Power": round(random.uniform(3, 6), 2),
                    "Running_Hours": round(random.uniform(100, 5000), 2),
                    "status": "Running"
                }

            elif state == "Maintenance":

                row = {
                    "Temperature": round(random.uniform(55, 75), 2),
                    "Vibration": round(random.uniform(3, 6), 2),
                    "RPM": random.randint(1800, 2400),
                    "Humidity": round(random.uniform(55, 75), 2),
                    "Power": round(random.uniform(6, 9), 2),
                    "Running_Hours": round(random.uniform(5000, 12000), 2),
                    "status": "Maintenance"
                }

            elif state == "Critical":

                row = {
                    "Temperature": round(random.uniform(85, 120), 2),
                    "Vibration": round(random.uniform(7, 12), 2),
                    "RPM": random.randint(2500, 3500),
                    "Humidity": round(random.uniform(70, 90), 2),
                    "Power": round(random.uniform(9, 15), 2),
                    "Running_Hours": round(random.uniform(12000, 20000), 2),
                    "status": "Critical"
                }

            else:

                row = {
                    "Temperature": round(random.uniform(15, 30), 2),
                    "Vibration": 0,
                    "RPM": 0,
                    "Humidity": round(random.uniform(40, 70), 2),
                    "Power": 0,
                    "Running_Hours": round(random.uniform(15000, 20000), 2),
                    "status": "Stopped"
                }

            data.append(row)

        return pd.DataFrame(data)

    def save(self, path):

        df = self.generate()

        df.to_csv(path, index=False)

        return df