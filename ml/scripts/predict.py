# Placeholder for predict.py
"""
TexTwin Machine Health Predictor (TMHP)
Prediction Script
"""

import joblib
import pandas as pd
from pathlib import Path

# ============================================
# Project Paths
# ============================================

BASE_DIR = Path(__file__).resolve().parents[1]

MODEL_PATH = BASE_DIR / "models" / "trained"

# ============================================
# Load Model
# ============================================

model = joblib.load(
    MODEL_PATH / "tmhp_model.pkl"
)

encoder = joblib.load(
    MODEL_PATH / "label_encoder.pkl"
)

print("=" * 60)
print("TexTwin Machine Health Predictor")
print("=" * 60)

# ============================================
# User Input
# ============================================

temperature = float(input("Temperature (°C): "))
vibration = float(input("Vibration (mm/s): "))
rpm = int(input("RPM: "))
humidity = float(input("Humidity (%): "))
power = float(input("Power (kW): "))
running_hours = int(input("Running Hours: "))

# ============================================
# Create Input DataFrame
# ============================================

sample = pd.DataFrame([{
    "Temperature": temperature,
    "Vibration": vibration,
    "RPM": rpm,
    "Humidity": humidity,
    "Power": power,
    "Running_Hours": running_hours
}])

# ============================================
# Prediction
# ============================================

prediction = model.predict(sample)[0]

status = encoder.inverse_transform([prediction])[0]

probability = model.predict_proba(sample)[0]

confidence = max(probability) * 100

# ============================================
# Output
# ============================================

print("\n" + "=" * 60)

print("Prediction Result")

print("=" * 60)

print(f"Machine Status : {status}")

print(f"Confidence     : {confidence:.2f}%")

print("=" * 60)