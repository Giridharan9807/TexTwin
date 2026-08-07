"""
TexTwin Machine Health Predictor (TMHP)
Model Training Script
"""

import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


# =====================================================
# Project Paths
# =====================================================

BASE_DIR = Path(__file__).resolve().parents[1]

DATASET_PATH = BASE_DIR / "dataset" / "synthetic" / "textwin_sensor_dataset.csv"

MODEL_PATH = BASE_DIR / "models" / "trained"

MODEL_PATH.mkdir(parents=True, exist_ok=True)


# =====================================================
# Load Dataset
# =====================================================

print("=" * 60)
print("Loading Dataset...")
print("=" * 60)

df = pd.read_csv(DATASET_PATH)

print("Dataset Shape :", df.shape)


# =====================================================
# Encode Labels
# =====================================================

encoder = LabelEncoder()

df["Status"] = encoder.fit_transform(df["Status"])

joblib.dump(
    encoder,
    MODEL_PATH / "label_encoder.pkl"
)


# =====================================================
# Features & Labels
# =====================================================

X = df.drop(
    columns=[
        "Machine_ID",
        "Status"
    ]
)

y = df["Status"]


# =====================================================
# Train Test Split
# =====================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# =====================================================
# Create Model
# =====================================================

print("\nTraining Random Forest...\n")

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42
)


# =====================================================
# Train Model
# =====================================================

model.fit(
    X_train,
    y_train
)


# =====================================================
# Prediction
# =====================================================

predictions = model.predict(
    X_test
)


# =====================================================
# Accuracy
# =====================================================

accuracy = accuracy_score(
    y_test,
    predictions
)

print(f"Accuracy : {accuracy:.4f}")


# =====================================================
# Save Model
# =====================================================

model_file = MODEL_PATH / "tmhp_model.pkl"

joblib.dump(
    model,
    model_file
)

print("\nModel Saved Successfully")

print(model_file)

print("\nTraining Completed")