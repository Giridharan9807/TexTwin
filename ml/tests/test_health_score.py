from textwin_ai.health_score import HealthScoreEngine

engine = HealthScoreEngine()

result = engine.predict(
    failure_risk=8,
    temperature=35,
    vibration=1.5,
    rpm=1200,
    humidity=60,
    power=4.5,
    running_hours=120,
)

print(result)