from textwin_ai.recommendation import RecommendationEngine

engine = RecommendationEngine()

result = engine.predict(

    status="Critical",

    failure_risk=92,

    health_score=28,

    temperature=95,

    vibration=9,

    rpm=3000,

    power=9,

    running_hours=12000

)

print(result)