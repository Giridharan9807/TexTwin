from textwin_ai.learning.model_manager import ModelManager

manager = ModelManager()

result = manager.save_version(

    "models/versions/tmhp_model_latest.pkl",

    "models/versions/label_encoder_latest.pkl",

    97.8

)

print(result)