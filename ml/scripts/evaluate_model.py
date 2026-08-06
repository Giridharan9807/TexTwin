# Placeholder for evaluate_model.py
"""
TexTwin Machine Health Predictor (TMHP)
Model Evaluation Script
"""

import joblib
import pandas as pd
import matplotlib.pyplot as plt

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay
)

# =====================================================
# Project Paths
# =====================================================

BASE_DIR = Path(__file__).resolve().parents[1]

DATASET_PATH = BASE_DIR / "dataset" / "synthetic" / "textwin_sensor_dataset.csv"

MODEL_PATH = BASE_DIR / "models" / "trained"

REPORT_PATH = BASE_DIR / "reports"

REPORT_PATH.mkdir(parents=True, exist_ok=True)

# =====================================================
# Load Dataset
# =====================================================

print("Loading Dataset...")

df = pd.read_csv(DATASET_PATH)

# =====================================================
# Encode Labels
# =====================================================

encoder = LabelEncoder()

df["Status"] = encoder.fit_transform(df["Status"])

# =====================================================
# Features
# =====================================================

X = df.drop(
    columns=[
        "Machine_ID",
        "Status"
    ]
)

y = df["Status"]

# =====================================================
# Split Dataset
# =====================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# =====================================================
# Load Model
# =====================================================

model = joblib.load(
    MODEL_PATH / "tmhp_model.pkl"
)

# =====================================================
# Prediction
# =====================================================

predictions = model.predict(X_test)

# =====================================================
# Metrics
# =====================================================

accuracy = accuracy_score(
    y_test,
    predictions
)

precision = precision_score(
    y_test,
    predictions,
    average="weighted"
)

recall = recall_score(
    y_test,
    predictions,
    average="weighted"
)

f1 = f1_score(
    y_test,
    predictions,
    average="weighted"
)

print("\n========== MODEL PERFORMANCE ==========\n")

print(f"Accuracy : {accuracy:.4f}")
print(f"Precision : {precision:.4f}")
print(f"Recall : {recall:.4f}")
print(f"F1 Score : {f1:.4f}")

print("\nClassification Report\n")

print(
    classification_report(
        y_test,
        predictions
    )
)

# =====================================================
# Confusion Matrix
# =====================================================

cm = confusion_matrix(
    y_test,
    predictions
)

disp = ConfusionMatrixDisplay(
    confusion_matrix=cm
)

disp.plot()

plt.title("TMHP Confusion Matrix")

plt.savefig(
    REPORT_PATH / "confusion_matrix.png",
    dpi=300
)

plt.close()

print("\nConfusion Matrix Saved")

# =====================================================
# Feature Importance
# =====================================================

importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})

importance = importance.sort_values(
    by="Importance",
    ascending=False
)

importance.to_csv(
    REPORT_PATH / "feature_importance.csv",
    index=False
)

print("\nFeature Importance Saved")

# =====================================================
# Training Report
# =====================================================

report_file = REPORT_PATH / "training_report.md"

with open(report_file, "w") as f:

    f.write("# TexTwin TMHP Model Report\n\n")

    f.write(f"Accuracy : {accuracy:.4f}\n\n")

    f.write(f"Precision : {precision:.4f}\n\n")

    f.write(f"Recall : {recall:.4f}\n\n")

    f.write(f"F1 Score : {f1:.4f}\n\n")

    f.write("## Classification Report\n\n")

    f.write(
        classification_report(
            y_test,
            predictions
        )
    )

print("\nTraining Report Saved")

print("\nEvaluation Completed Successfully")