from textwin_ai.rul import RULEngine

engine = RULEngine()

result = engine.predict(

    health_score=92,

    failure_risk=8,

    running_hours=6000

)

print(result)