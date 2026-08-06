"""
TexTwin Machine Health Predictor (TMHP)
Hyperparameter Tuning
"""

import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# =====================================================
# Paths
# =====================================================

BASE_DIR = Path(__file__).resolve().parents[1]

DATASET_PATH = BASE_DIR / "dataset" / "synthetic" / "textwin_sensor_dataset.csv"

MODEL_PATH = BASE_DIR / "models" / "trained"

REPORT_PATH = BASE_DIR / "reports"

MODEL_PATH.mkdir(parents=True, exist_ok=True)
REPORT_PATH.mkdir(parents=True, exist_ok=True)

# =====================================================
# Load Dataset
# =====================================================

df = pd.read_csv(DATASET_PATH)

encoder = LabelEncoder()

df["Status"] = encoder.fit_transform(df["Status"])

X = df.drop(columns=["Machine_ID", "Status"])
y = df["Status"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# =====================================================
# Parameter Grid
# =====================================================

param_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [5, 10, 20, None],
    "min_samples_split": [2, 5],
    "min_samples_leaf": [1, 2]
}

# =====================================================
# Grid Search
# =====================================================

grid = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring="accuracy",
    n_jobs=-1
)

print("Searching for best parameters...")

grid.fit(X_train, y_train)

best_model = grid.best_estimator_

# =====================================================
# Save Best Model
# =====================================================

joblib.dump(
    best_model,
    MODEL_PATH / "tmhp_model_optimized.pkl"
)

# =====================================================
# Save Report
# =====================================================

with open(REPORT_PATH / "best_parameters.txt", "w") as f:

    f.write("Best Parameters\n\n")

    f.write(str(grid.best_params_))

    f.write("\n\n")

    f.write(f"Best CV Accuracy : {grid.best_score_:.4f}")

print("\nBest Parameters")

print(grid.best_params_)

print("\nCross Validation Accuracy")

print(grid.best_score_)

print("\nOptimized Model Saved")