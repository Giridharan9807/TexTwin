"""
TexTwin AI
Self Learning Engine
"""

from pathlib import Path

from textwin_ai.learning.factory_simulator import FactorySimulator
from textwin_ai.learning.collector import LearningCollector
from textwin_ai.learning.retrainer import AutoRetrainer
from textwin_ai.learning.evaluator import ModelEvaluator
from textwin_ai.learning.model_manager import ModelManager
from textwin_ai.learning.scheduler import LearningScheduler


class SelfLearningEngine:

    def __init__(self):

        # Factory Simulator
        self.simulator = FactorySimulator(machines=100)

        # Learning Pipeline
        self.collector = LearningCollector()
        self.trainer = AutoRetrainer()
        self.evaluator = ModelEvaluator()
        self.manager = ModelManager()

        # Scheduler
        self.scheduler = LearningScheduler(threshold=500)

        # Temporary sensor data file
        self.temp_file = Path(
            "learning_data/incoming/latest_sensor_data.csv"
        )

        self.temp_file.parent.mkdir(
            parents=True,
            exist_ok=True
        )

    def run_cycle(self):

        # Step 1: Generate new factory sensor data
        df = self.simulator.step()

        # Step 2: Save generated data
        df.to_csv(
            self.temp_file,
            index=False
        )

        # Step 3: Add data to master dataset
        self.collector.update(
            self.temp_file
        )

        deployed = False
        accuracy = None

        # Step 4: Check whether retraining is required
        if self.scheduler.should_retrain():

            result = self.trainer.train()

            accuracy = result["accuracy"]

            # Step 5: Compare new model with current model
            if self.evaluator.should_deploy(accuracy):

                self.manager.save_version(
                    result["model"],
                    result["encoder"],
                    accuracy
                )

                deployed = True

        # Step 6: Return cycle summary
        return {

            "recordsGenerated": len(df),

            "datasetSize": self.scheduler.dataset_size(),

            "accuracy": accuracy,

            "deployed": deployed

        }