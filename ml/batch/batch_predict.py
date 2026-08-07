"""
TexTwin AI
Batch Prediction Engine
"""

import pandas as pd

from textwin_ai import TexTwinAI


INPUT_FILE = "dataset/synthetic/textwin_sensor_dataset.csv"
OUTPUT_FILE = "reports/prediction_results.csv"


def main():

    engine = TexTwinAI()

    df = pd.read_csv(INPUT_FILE)

    predictions = []

    print(f"Loaded {len(df)} machines.\n")

    for _, row in df.iterrows():

        result = engine.predict(

            temperature=row["Temperature"],

            vibration=row["Vibration"],

            rpm=row["RPM"],

            humidity=row["Humidity"],

            power=row["Power"],

            running_hours=row["Running_Hours"]

        )

        predictions.append(result)

    prediction_df = pd.DataFrame(predictions)

    final_df = pd.concat([df, prediction_df], axis=1)

    final_df.to_csv(OUTPUT_FILE, index=False)

    print("\nBatch Prediction Completed")

    print(f"Results saved to:\n{OUTPUT_FILE}")

    print("\nPreview:\n")

    print(final_df.head())


if __name__ == "__main__":
    main()