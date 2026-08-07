"""
TexTwin AI
Factory Simulator V2
Health-Based Machine Lifecycle
"""

import random
import pandas as pd


class FactorySimulator:

    def __init__(self, machines=100):

        self.machines = []

        for i in range(machines):

            health = random.uniform(90, 100)

            self.machines.append({

                "machineId": f"M{i+1:04d}",

                "health": health,

                "wearRate": random.uniform(0.01, 0.08),

                "temperature": random.uniform(30, 40),

                "vibration": random.uniform(0.5, 2),

                "rpm": random.randint(1200, 1700),

                "humidity": random.uniform(45, 60),

                "power": random.uniform(3, 6),

                "runningHours": random.uniform(100, 1000),

                "status": "Running"

            })

    def step(self):

        rows = []

        for m in self.machines:

            # Machine keeps running
            m["runningHours"] += 1

            # Health slowly decreases
            m["health"] -= random.uniform(0, m["wearRate"])

            # Random sudden failure
            if random.random() < 0.01:

                m["health"] -= random.uniform(5, 20)

            # Clamp health
            m["health"] = max(0, min(100, m["health"]))

            # Sensor values depend on health
            health_factor = (100 - m["health"]) / 100

            m["temperature"] = round(
                35 + health_factor * 80 + random.uniform(-2, 2),
                2
            )

            m["vibration"] = round(
                1 + health_factor * 10 + random.uniform(-0.3, 0.3),
                2
            )

            m["power"] = round(
                4 + health_factor * 8 + random.uniform(-0.5, 0.5),
                2
            )

            m["humidity"] = round(
                50 + random.uniform(-5, 5),
                2
            )

            m["rpm"] = max(
                0,
                int(
                    1500
                    + random.uniform(-100, 100)
                    - health_factor * 300
                )
            )

            # Determine status
            if m["health"] >= 80:

                m["status"] = "Running"

            elif m["health"] >= 60:

                m["status"] = "Maintenance"

            elif m["health"] >= 30:

                m["status"] = "Critical"

            else:

                m["status"] = "Stopped"

            # Automatic repair
            if m["status"] == "Stopped":

                if random.random() < 0.20:

                    m["health"] = random.uniform(90, 98)

                    m["temperature"] = random.uniform(30, 40)

                    m["vibration"] = random.uniform(0.5, 2)

                    m["power"] = random.uniform(3, 6)

                    m["rpm"] = random.randint(1200, 1700)

                    m["status"] = "Running"

            rows.append({

                "machineId": m["machineId"],

                "Health": round(m["health"], 2),

                "Temperature": round(m["temperature"], 2),

                "Vibration": round(m["vibration"], 2),

                "RPM": int(m["rpm"]),

                "Humidity": round(m["humidity"], 2),

                "Power": round(m["power"], 2),

                "Running_Hours": round(m["runningHours"], 2),

                "status": m["status"]

            })

        return pd.DataFrame(rows)