from textwin_ai.learning.evaluator import ModelEvaluator

evaluator = ModelEvaluator()

print("Current Accuracy:")
print(evaluator.current_accuracy())

print()

print("Deploy 98.2 ?")
print(evaluator.should_deploy(98.2))

print()

print("Deploy 92.5 ?")
print(evaluator.should_deploy(92.5))