"""
TexTwin AI
Learning Data Collector
"""

from pathlib import Path
import pandas as pd


class LearningCollector:

    def __init__(self):

        self.master_dataset = Path(
            "learning_data/processed/master_dataset.csv"
        )

        self.master_dataset.parent.mkdir(
            parents=True,
            exist_ok=True
        )

    def update(self, new_dataset_path):

        new_df = pd.read_csv(new_dataset_path)

        if self.master_dataset.exists():

            old_df = pd.read_csv(self.master_dataset)

            merged = pd.concat(
                [old_df, new_df],
                ignore_index=True
            )

            merged = merged.drop_duplicates()

        else:

            merged = new_df

        merged.to_csv(
            self.master_dataset,
            index=False
        )

        return merged