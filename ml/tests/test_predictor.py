from textwin_ai import TMHPPredictor

predictor = TMHPPredictor()

sample = {
    "Temperature": 35,
    "Vibration": 1.5,
    "RPM": 1200,
    "Humidity": 60,
    "Power": 4.5,
    "Running_Hours": 120
}

result = predictor.predict(sample)

print("=" * 40)
print("TexTwin AI Prediction")
print("=" * 40)
print(result)
print("=" * 40)