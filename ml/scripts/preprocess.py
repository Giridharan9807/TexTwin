# Placeholder for preprocess.py
"""
TexTwin Machine Health Predictor (TMHP)
Preprocessing Script
"""

import pandas as pd
import joblib
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
# Project Paths

BASE_DIR = Path(__file__).resolve().parents[1]

DATASET_PATH = BASE_DIR / "dataset" / "synthetic" / "textwin_sensor_dataset.csv"

MODEL_PATH = BASE_DIR / "models" / "trained"

MODEL_PATH.mkdir(parents=True, exist_ok=True)
print("=" * 60)
print("Loading Dataset...")
print("=" * 60)

df = pd.read_csv(DATASET_PATH)

print(df.head())

print()

print("Dataset Shape:", df.shape)
print("\nChecking Missing Values\n")

print(df.isnull().sum())
print("\nChecking Duplicate Rows\n")

duplicates = df.duplicated().sum()

print("Duplicate Rows:", duplicates)

df = df.drop_duplicates()

print("Dataset Shape:", df.shape)
print("\nEncoding Labels\n")

encoder = LabelEncoder()

df["Status"] = encoder.fit_transform(df["Status"])

print(df.head())
encoder_path = MODEL_PATH / "label_encoder.pkl"

joblib.dump(
    encoder,
    encoder_path
)

print()

print("Label Encoder Saved")

print(encoder_path)
X = df.drop(
    columns=[
        "Machine_ID",
        "Status"
    ]
)

y = df["Status"]

print()

print("Features Shape :", X.shape)

print("Labels Shape :", y.shape)
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)
print()

print("=" * 60)

print("Training Samples :", len(X_train))

print("Testing Samples  :", len(X_test))

print("=" * 60)
print()

print("Preprocessing Completed Successfully")