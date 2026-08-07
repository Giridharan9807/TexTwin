"""
TexTwin AI
Learning Scheduler
"""

from pathlib import Path
import pandas as pd


class LearningScheduler:

    def __init__(self, threshold=5000):

        self.threshold = threshold

        self.dataset = Path(
            "learning_data/processed/master_dataset.csv"
        )

    def should_retrain(self):

        if not self.dataset.exists():

            return False

        df = pd.read_csv(self.dataset)

        return len(df) >= self.threshold

    def dataset_size(self):

        if not self.dataset.exists():

            return 0

        return len(pd.read_csv(self.dataset))