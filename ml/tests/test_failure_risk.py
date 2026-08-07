from textwin_ai.failure_risk import FailureRiskEngine

engine = FailureRiskEngine()

result = engine.predict(
    status="Critical",
    confidence=60,
    temperature=95,
    vibration=9,
    rpm=3000,
    humidity=80,
    power=10,
    running_hours=12000,
)

print(result)