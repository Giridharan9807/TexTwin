from textwin_ai.learning.engine import SelfLearningEngine

engine = SelfLearningEngine()

for i in range(10):

    print(f"\n========== Cycle {i+1} ==========")

    result = engine.run_cycle()

    print(result)