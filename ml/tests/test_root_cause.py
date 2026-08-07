from textwin_ai.root_cause import RootCauseEngine

engine = RootCauseEngine()

result = engine.predict(
    temperature=92,
    vibration=8.5,
    rpm=2800,
    humidity=90,
    power=9,
    running_hours=12000,
)

print(result)