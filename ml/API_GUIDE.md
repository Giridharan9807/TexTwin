# TexTwin AI SDK Integration Guide

## Overview

TexTwin AI SDK is the Machine Learning module for the TexTwin Smart Machine Health Monitoring System.

It analyzes machine sensor values and provides:

- Machine Health Prediction
- Failure Risk Analysis
- Health Score
- Root Cause Analysis
- Remaining Useful Life (RUL)
- Maintenance Recommendation
- Unified AI Report

---

# Installation

```bash
pip install -r requirements.txt
```

---

# Import

```python
from textwin_ai.report_generator import TexTwinAI
```

---

# Initialize

```python
engine = TexTwinAI()
```

---

# Input Format

```python
sensor_data = {
    "Temperature": 35,
    "Vibration": 1.5,
    "RPM": 1500,
    "Humidity": 60,
    "Power": 4.5,
    "Running_Hours": 250
}
```

---

# Prediction

```python
result = engine.predict(sensor_data)
```

---

# Output

```json
{
  "status": "Running",
  "confidence": 100.0,
  "failureRisk": 5,
  "riskLevel": "Low",
  "healthScore": 95,
  "healthLevel": "Excellent",
  "rootCause": "No abnormal operating condition detected.",
  "remainingHours": 17941,
  "remainingDays": 747,
  "lifeLevel": "Excellent",
  "recommendation": [
      "Machine operating normally. Continue monitoring."
  ],
  "priority": "Low",
  "maintenanceType": "Preventive"
}
```

---

# AI Pipeline

Sensor Data

↓

Machine Health Prediction

↓

Failure Risk

↓

Health Score

↓

Root Cause Analysis

↓

Remaining Useful Life

↓

Maintenance Recommendation

↓

Unified AI Report

---

# Test Commands

```bash
python -m tests.test_predictor

python -m tests.test_failure_risk

python -m tests.test_health_score

python -m tests.test_root_cause

python -m tests.test_rul

python -m tests.test_recommendation

python -m tests.test_report_generator

python -m tests.test_factory_analytics

python -m tests.test_machine_ranking
```

---

# Project Structure

```
ml/
│
├── dataset/
├── models/
├── reports/
├── scripts/
├── tests/
├── textwin_ai/
├── batch/
├── README.md
├── API_GUIDE.md
└── requirements.txt
```

---

# Maintainer

TexTwin AI SDK Team