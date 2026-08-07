"""
TexTwin Input Validator
"""

REQUIRED_FIELDS = [
    "Temperature",
    "Vibration",
    "RPM",
    "Humidity",
    "Power",
    "Running_Hours"
]


def validate_input(data: dict):

    missing = []

    for field in REQUIRED_FIELDS:
        if field not in data:
            missing.append(field)

    if missing:
        raise ValueError(
            f"Missing fields: {missing}"
        )

    return True