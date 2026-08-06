"""
TexTwin Machine Health Predictor (TMHP)
Model Comparison Script
"""

import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC

from sklearn.metrics import accuracy_score

# =====================================================
# Paths
# =====================================================

BASE_DIR = Path(__file__).resolve().parents[1]

DATASET_PATH = BASE_DIR / "dataset" / "synthetic" / "textwin_sensor_dataset.csv"

REPORT_PATH = BASE_DIR / "reports"

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
    test_size=0.2,
    random_state=42,
    stratify=y
)

# =====================================================
# Models
# =====================================================

models = {
    "Decision Tree": DecisionTreeClassifier(random_state=42),

    "Random Forest": RandomForestClassifier(
        n_estimators=300,
        random_state=42
    ),

    "Logistic Regression": LogisticRegression(max_iter=1000),

    "KNN": KNeighborsClassifier(),

    "SVM": SVC()
}

results = []

print("=" * 60)
print("Model Comparison")
print("=" * 60)

for name, model in models.items():

    model.fit(X_train, y_train)

    prediction = model.predict(X_test)

    accuracy = accuracy_score(y_test, prediction)

    print(f"{name:<25} {accuracy:.4f}")

    results.append([name, accuracy])

# =====================================================
# Save Results
# =====================================================

results_df = pd.DataFrame(
    results,
    columns=["Model", "Accuracy"]
)

results_df = results_df.sort_values(
    by="Accuracy",
    ascending=False
)

results_df.to_csv(
    REPORT_PATH / "model_comparison.csv",
    index=False
)

print("\nBest Model")

print(results_df.iloc[0])

print("\nComparison Saved")