"""
TexTwin AI
Model Version Manager
"""

from pathlib import Path
import shutil
import json
from datetime import datetime


class ModelManager:

    def __init__(self):

        self.version_dir = Path("models/versions")
        self.active_dir = Path("models/trained")

        self.version_dir.mkdir(parents=True, exist_ok=True)

        self.history_file = self.version_dir / "model_history.json"

        if not self.history_file.exists():
            with open(self.history_file, "w") as f:
                json.dump([], f)

    def save_version(self, model_path, encoder_path, accuracy):

        history = json.loads(self.history_file.read_text())

        version = len(history) + 1

        model_name = f"tmhp_model_v{version}.pkl"
        encoder_name = f"label_encoder_v{version}.pkl"

        shutil.copy(model_path, self.version_dir / model_name)
        shutil.copy(encoder_path, self.version_dir / encoder_name)

        shutil.copy(model_path, self.active_dir / "tmhp_model.pkl")
        shutil.copy(encoder_path, self.active_dir / "label_encoder.pkl")

        history.append({

            "version": version,

            "accuracy": accuracy,

            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        })

        self.history_file.write_text(
            json.dumps(history, indent=4)
        )

        return history[-1]