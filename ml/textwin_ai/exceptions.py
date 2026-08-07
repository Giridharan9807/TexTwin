class TexTwinError(Exception):
    """Base TexTwin exception."""
    pass


class InvalidSensorData(TexTwinError):
    """Raised when sensor values are invalid."""
    pass


class ModelLoadError(TexTwinError):
    """Raised when ML model cannot be loaded."""
    pass