from textwin_ai.report_generator import TexTwinAI

ai = TexTwinAI()

result = ai.predict(

    temperature=35,

    vibration=1.5,

    rpm=1200,

    humidity=60,

    power=4.5,

    running_hours=120,

)

print(result)