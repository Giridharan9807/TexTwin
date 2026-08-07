from textwin_ai.learning.scheduler import LearningScheduler

scheduler = LearningScheduler(threshold=500)

print("Dataset Size:")

print(scheduler.dataset_size())

print()

print("Should Retrain?")

print(scheduler.should_retrain())