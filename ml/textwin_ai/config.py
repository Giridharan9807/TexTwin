"""
Configuration
"""

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]

MODEL_DIR = BASE_DIR / "models" / "trained"

TMHP_MODEL = MODEL_DIR / "tmhp_model.pkl"

LABEL_ENCODER = MODEL_DIR / "label_encoder.pkl"