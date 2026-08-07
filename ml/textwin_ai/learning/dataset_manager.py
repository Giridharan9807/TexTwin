"""
TexTwin AI
Dataset Manager
"""

from pathlib import Path
import pandas as pd


class DatasetManager:

    REQUIRED_COLUMNS = [
        "Temperature",
        "Vibration",
        "RPM",
        "Humidity",
        "Power",
        "Running_Hours",
        "status"
    ]

    def __init__(self):

        self.master_dataset = Path(
            "learning_data/processed/master_dataset.csv"
        )

        self.master_dataset.parent.mkdir(
            parents=True,
            exist_ok=True
        )

    def update(self, new_dataset):

        new_df = pd.read_csv(new_dataset)

        # Validate columns
        missing = [
            c for c in self.REQUIRED_COLUMNS
            if c not in new_df.columns
        ]

        if missing:
            raise ValueError(
                f"Missing columns: {missing}"
            )

        # Remove missing values
        new_df = new_df.dropna()

        # Remove duplicates inside new data
        new_df = new_df.drop_duplicates()

        if self.master_dataset.exists():

            master = pd.read_csv(
                self.master_dataset
            )

            master = pd.concat(
                [master, new_df],
                ignore_index=True
            )

            master = master.drop_duplicates()

        else:

            master = new_df

        master.to_csv(
            self.master_dataset,
            index=False
        )

        return {

            "totalRecords": len(master),

            "newRecords": len(new_df)

        }