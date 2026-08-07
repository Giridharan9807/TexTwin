"""
TexTwin Machine Health Predictor
Exploratory Data Analysis (EDA)
"""

import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

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

print("Loading Dataset...")

df = pd.read_csv(DATASET_PATH)

print(df.head())

print("\nDataset Shape:", df.shape)

# =====================================================
# Dataset Information
# =====================================================

print("\nDataset Info")

print(df.info())

print("\nStatistics")

print(df.describe())

# Save statistics

df.describe().to_csv(
    REPORT_PATH / "dataset_summary.csv"
)

print("\nDataset Summary Saved")

# =====================================================
# Class Distribution
# =====================================================

plt.figure(figsize=(8,5))

df["Status"].value_counts().plot(kind="bar")

plt.title("Machine Status Distribution")

plt.xlabel("Status")

plt.ylabel("Count")

plt.tight_layout()

plt.savefig(
    REPORT_PATH / "class_distribution.png",
    dpi=300
)

plt.close()

print("Class Distribution Saved")

print("\nEDA Completed Successfully")

# =====================================================
# Correlation Heatmap
# =====================================================

plt.figure(figsize=(8,6))

correlation = df.select_dtypes(include="number").corr()

plt.imshow(correlation, cmap="coolwarm", interpolation="nearest")

plt.colorbar()

plt.xticks(range(len(correlation.columns)), correlation.columns, rotation=45)

plt.yticks(range(len(correlation.columns)), correlation.columns)

plt.title("Feature Correlation Heatmap")

plt.tight_layout()

plt.savefig(
    REPORT_PATH / "correlation_heatmap.png",
    dpi=300
)

plt.close()

print("Correlation Heatmap Saved")

# =====================================================
# Feature Distribution
# =====================================================

features = [
    "Temperature",
    "Vibration",
    "RPM",
    "Humidity",
    "Power",
    "Running_Hours"
]

for feature in features:

    plt.figure(figsize=(6,4))

    plt.hist(df[feature], bins=25)

    plt.title(f"{feature} Distribution")

    plt.xlabel(feature)

    plt.ylabel("Frequency")

    plt.tight_layout()

    plt.savefig(
        REPORT_PATH / f"{feature.lower()}_distribution.png",
        dpi=300
    )

    plt.close()

print("Feature Distribution Saved")

# =====================================================
# Boxplots
# =====================================================

for feature in features:

    plt.figure(figsize=(5,4))

    plt.boxplot(df[feature])

    plt.title(f"{feature} Boxplot")

    plt.tight_layout()

    plt.savefig(
        REPORT_PATH / f"{feature.lower()}_boxplot.png",
        dpi=300
    )

    plt.close()

print("Boxplots Saved")
# =====================================================
# Generate Report
# =====================================================

with open(REPORT_PATH / "eda_report.md", "w") as f:

    f.write("# TexTwin Dataset Analysis\n\n")

    f.write(f"Dataset Shape : {df.shape}\n\n")

    f.write("## Missing Values\n\n")

    f.write(df.isnull().sum().to_string())

    f.write("\n\n")

    f.write("## Dataset Statistics\n\n")

    f.write(df.describe().to_string())

print("EDA Report Saved")

print("\nEDA Completed Successfully")