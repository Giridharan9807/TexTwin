"""
TexTwin AI
Auto Retraining Engine
"""

from pathlib import Path
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


class AutoRetrainer:

    def __init__(self):

        self.dataset = Path(
            "learning_data/processed/master_dataset.csv"
        )

        self.model_dir = Path(
            "models/versions"
        )

        self.model_dir.mkdir(
            parents=True,
            exist_ok=True
        )

    def train(self):

        df = pd.read_csv(self.dataset)

        X = df[
            [
                "Temperature",
                "Vibration",
                "RPM",
                "Humidity",
                "Power",
                "Running_Hours"
            ]
        ]

        y = df["status"]

        encoder = LabelEncoder()

        y = encoder.fit_transform(y)

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42
        )

        model = RandomForestClassifier(
            n_estimators=200,
            random_state=42
        )

        model.fit(X_train, y_train)

        prediction = model.predict(X_test)

        accuracy = accuracy_score(
            y_test,
            prediction
        )

        model_file = self.model_dir / "tmhp_model_latest.pkl"

        encoder_file = self.model_dir / "label_encoder_latest.pkl"

        joblib.dump(
            model,
            model_file
        )

        joblib.dump(
            encoder,
            encoder_file
        )

        return {
            "accuracy": round(
                accuracy * 100,
                2
            ),
            "model": str(model_file),
            "encoder": str(encoder_file)
        }