from textwin_ai import TexTwinAI

engine = TexTwinAI()

result = engine.predict(
    temperature=35,
    vibration=1.5,
    rpm=1200,
    humidity=60,
    power=4.5,
    running_hours=120,
)

print(result)