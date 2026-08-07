"""
TexTwin AI
Model Evaluator
"""

import json
from pathlib import Path


class ModelEvaluator:

    def __init__(self):

        self.history = Path(
            "models/versions/model_history.json"
        )

    def should_deploy(self, new_accuracy):

        if not self.history.exists():
            return True

        history = json.loads(
            self.history.read_text()
        )

        if len(history) == 0:
            return True

        current_accuracy = history[-1]["accuracy"]

        return new_accuracy > current_accuracy

    def current_accuracy(self):

        if not self.history.exists():
            return None

        history = json.loads(
            self.history.read_text()
        )

        if len(history) == 0:
            return None

        return history[-1]["accuracy"]