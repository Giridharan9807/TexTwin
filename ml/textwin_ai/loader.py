"""
Model Loader
"""

import joblib

from .config import TMHP_MODEL
from .config import LABEL_ENCODER


def load_model():

    model = joblib.load(TMHP_MODEL)

    encoder = joblib.load(LABEL_ENCODER)

    return model, encoder