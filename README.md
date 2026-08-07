Dinesh
# TexTwin Machine Learning Workspace

This workspace houses the machine learning pipelines, datasets, training scripts, and Jupyter notebooks for predicting loom failures, yarn breaks, estimating remaining useful life (RUL), and running what-if operational simulations for the textile weaving industry.

---

## 📂 Workspace Structure

The workspace is organized into modular components designed for reproducibility, testability, and standard ML engineering practices:

```
ml/
├── configs/                  # Workspace and hyperparameters configuration
│   ├── config.py             # General data pathways and paths config
│   └── model_config.yaml     # Model configurations and hyperparameter settings
│
├── dataset/                  # Dataset workspace for telemetry records
│   ├── raw/                  # Unprocessed telemetry inputs
│   ├── processed/            # Scaled, engineered features ready for training
│   ├── synthetic/            # Generated inputs for scenario testing
│   └── README.md             # Dataset documentation
│
├── exports/                  # Serialized runtime exports of models
│
├── logs/                     # ML training runs, logging, and evaluation logs
│
├── models/                   # Saved model parameters, checkpoints, and weights
│   ├── checkpoints/          # Intermediate training checkpoints
│   ├── exported/             # Production-ready serialized inference formats
│   ├── trained/              # Final trained models
│   │   ├── label_encoder.pkl # Fitted LabelEncoder for target status labels
│   │   ├── tmhp_model.pkl    # Trained Random Forest classifier model
│   │   └── tmhp_model_optimized.pkl # Optimized Random Forest model after Grid Search
│   └── README.md             # Model artifacts documentation
│
├── notebooks/                # Step-by-step experimentation notebooks
│   ├── 01_dataset_generation.ipynb  # Synthesize loom sensor records
│   ├── 02_data_analysis.ipynb       # Exploratory data analysis (EDA)
│   ├── 03_model_training.ipynb      # XGBoost and LSTM network training
│   ├── 04_model_evaluation.ipynb    # Training validation and ROC/F1 analysis
│   └── 05_prediction_testing.ipynb  # Verification of real-time prediction feeds
│
├── reports/                  # Generated reports, statistics and visualization
│   ├── best_parameters.txt   # Best parameters and accuracy from grid search tuning
│   ├── class_distribution.png # Machine status class distribution chart
│   ├── confusion_matrix.png  # Anomaly prediction evaluation heatmap
│   ├── correlation_heatmap.png # Correlation heatmap of sensor features
│   ├── dataset_summary.csv   # Statistical summary table of telemetry dataset
│   ├── eda_report.md         # Narrative report of exploratory data analysis
│   ├── evaluation_report.md  # Detailed metrics and validation curves
│   ├── feature_importance.csv # Feature importances ranking list
│   ├── model_comparison.csv  # Performance comparison table of candidate algorithms
│   ├── training_report.md    # Summary of model training sessions
│   └── *_boxplot.png / *_distribution.png # Distribution visual plots for sensors
│
├── scripts/                  # Standalone executable pipeline scripts
│   ├── eda.py                # Performs Exploratory Data Analysis & generates plots/reports
│   ├── evaluate_model.py     # Evaluation metrics, confusion matrix & feature importances
│   ├── generate_dataset.py   # Script to synthesize telemetry logs
│   ├── hyperparameter_tuning.py # Grid Search hyperparameter optimization script
│   ├── model_comparison.py   # Evaluates multiple algorithms (RF, DT, LR, SVM, KNN)
│   ├── predict.py            # CLI-based inference script for real-time telemetry inputs
│   ├── preprocess.py         # Performs feature scaling, encoding and data cleaning
│   ├── train_model.py        # Core Random Forest model training script
│   └── utils.py              # Utility helper scripts
│
├── .gitignore                # Workspace git ignore configurations
├── README.md                 # This workspace overview document
└── requirements.txt          # Python library dependencies
```

---

## 🛠️ Folder Details & Purpose

### 1. `configs/`
Holds execution paths, database/MQTT connector URLs, logging paths, and model hyperparameters (learning rates, batch sizes, estimators) in structured YAML and Python configurations to enforce clean configuration management.

### 2. `dataset/`
Handles raw data intake, staging of processed tensors, and synthetic simulation generation. It contains subfolders separating raw logs, feature-engineered matrices, and simulated testing inputs to avoid data leakage and maintain trackable pipelines.

### 3. `exports/`
Stores serialized versions of trained models (e.g. JSON configs, HDF5, or PyTorch weights) intended for downstream deployment inside the Node.js Express server.

### 4. `logs/`
Captures model run timestamps, training convergence logs, warning flags, and debugging prints generated during the scripts execution to provide pipeline observability.

### 5. `models/`
Maintains check-pointed states during deep neural network (LSTM) training epochs, optimized final model binaries (XGBoost classifiers), and serialized weights for version control and rollback safety.

### 6. `notebooks/`
Chronologically ordered Jupyter Notebooks (`01_dataset_generation` through `05_prediction_testing`) designed for visual storytelling, data visualization (exploratory data analysis), and prototyping models before exporting to modular python scripts.

### 7. `reports/`
Holds static markdown performance summaries and generated validation charts (e.g. confusion matrix heatmaps, loss over epochs, ROC curves) to keep stakeholders and engineers aligned on model accuracy.

### 8. `scripts/`
Refactored, production-ready Python command-line interfaces (CLIs) mapping to every step of the machine learning pipeline, complete with arguments, logging, and error handling.

---

## 🚀 Setting Up the Environment

1. Navigate to this workspace:
   ```bash
   cd ml
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Unix/macOS:
   source venv/bin/activate
   ```
3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

---

## 🏃 How to Run the Pipeline

Run the scripts in the following order to execute the full pipeline from raw data exploration to real-time inference:

### 1. Data Preprocessing & Cleaning
Loads the raw telemetry logs, checks for missing/duplicate values, encodes target labels, and performs train-test splitting.
```bash
python scripts/preprocess.py
```

### 2. Exploratory Data Analysis (EDA)
Generates descriptive statistics, boxplots, histograms, and correlation heatmaps to visualize the distribution of variables.
```bash
python scripts/eda.py
```

### 3. Model Comparison
Trains and evaluates multiple candidate models (Random Forest, Decision Tree, Logistic Regression, SVM, KNN) to identify the best baseline classifier.
```bash
python scripts/model_comparison.py
```

### 4. Hyperparameter Tuning
Performs cross-validated grid search to find the optimal hyperparameters for the Random Forest classifier and exports the optimized model.
```bash
python scripts/hyperparameter_tuning.py
```

### 5. Model Training
Trains the baseline Random Forest classifier on the preprocessed training set and saves the model.
```bash
python scripts/train_model.py
```

### 6. Model Evaluation & Report Generation
Loads the trained Random Forest classifier, evaluates it on the test partition, and saves evaluation reports, a confusion matrix heatmap, and feature importance rankings.
```bash
python scripts/evaluate_model.py
```

### 7. Interactive Prediction CLI
An interactive command-line interface to input real-time telemetry sensor values (Temperature, Vibration, RPM, Humidity, Power, Running Hours) and receive a predicted machine status classification along with confidence metrics.
```bash
python scripts/predict.py
```

# TexTwin – AI-Powered Digital Twin for Smart Textile Weaving Industry

An AI-powered Digital Twin platform that enables real-time monitoring, predictive maintenance, process optimization, and intelligent decision-making for textile weaving industries.

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Objectives](#-objectives)
- [Proposed Solution](#-proposed-solution)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [High-Level System Architecture](#-high-level-system-architecture)
- [Low-Level Design (LLD)](#-low-level-design-lld)
- [Functional Requirements](#-functional-requirements)
- [Non-Functional Requirements](#-non-functional-requirements)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Project Roadmap](#-project-roadmap)
- [Team Members](#-team-members)
- [Expected Outcomes](#-expected-outcomes)
- [Future Scope](#-future-scope)
- [Day 2 Report](#-day-2-report)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 📖 Project Overview

The textile weaving industry relies on continuous machine operation to maintain productivity and fabric quality. However, unexpected machine failures, production downtime, excessive energy consumption, and inefficient maintenance often reduce operational efficiency and increase costs.

**TexTwin** is an AI-powered Digital Twin platform that creates a real-time virtual representation of weaving machines using IoT sensor data. The system continuously monitors machine health, predicts failures using Artificial Intelligence, performs root cause analysis, and provides intelligent recommendations through an interactive dashboard.

By integrating IoT, AI, and Digital Twin technology, TexTwin helps manufacturers improve productivity, reduce downtime, optimize maintenance schedules, and support data-driven decision-making.

---

## 🎯 Problem Statement

The textile weaving industry faces significant challenges, including unexpected machine failures, production downtime, high energy consumption, and inefficient maintenance practices. Existing monitoring systems lack real-time simulation and intelligent decision support.

TexTwin addresses these challenges by creating an AI-powered Digital Twin that continuously mirrors weaving machines using live sensor data. The system enables predictive maintenance, process optimization, root cause analysis, and what-if simulations to improve productivity while reducing operational costs.

---

## 🎯 Objectives

- Develop a Digital Twin for textile weaving machines.
- Monitor machine health using real-time IoT sensor data.
- Predict machine failures before they occur.
- Reduce production downtime.
- Optimize energy consumption.
- Improve maintenance planning.
- Perform root cause analysis for production issues.
- Simulate operational changes using What-if Analysis.
- Support intelligent decision-making through AI.

---

## 💡 Proposed Solution

TexTwin integrates **IoT devices**, **Artificial Intelligence**, and **Digital Twin technology** into a unified monitoring platform.

The system continuously collects sensor data such as temperature, vibration, RPM, yarn tension, power consumption, and fabric output. This information is processed and analyzed by AI models to detect abnormal machine behavior, predict failures, estimate Remaining Useful Life (RUL), and recommend maintenance actions.

A Digital Twin provides a real-time virtual representation of each weaving machine, allowing operators and managers to monitor production, analyze performance, and simulate operational changes through an interactive dashboard.

---

## ✨ Features

### Asset Management
- Register and manage weaving machines
- Track machine status and maintenance history

### Real-Time Sensor Monitoring
- Temperature Monitoring
- Vibration Monitoring
- RPM Monitoring
- Yarn Tension Monitoring
- Power Consumption Monitoring
- Fabric Output Monitoring

### AI Analytics
- Predictive Maintenance
- Failure Prediction
- Yarn Break Prediction
- Remaining Useful Life (RUL) Estimation
- Root Cause Analysis

### Digital Twin
- Live virtual representation of weaving machines
- Continuous synchronization with sensor data

### Decision Support
- Maintenance recommendations
- Production optimization suggestions
- Intelligent alerts
- What-if simulations

### Dashboard
- Live machine status
- Machine health
- Production analytics
- AI insights
- Historical trends
- Reports

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **AI / Machine Learning** | Python, Scikit-learn, TensorFlow |
| **IoT** | ESP32, MQTT |
| **Real-Time Communication** | MQTT / WebSockets |
| **Visualization** | Chart.js |
| **Version Control** | Git & GitHub |
| **Development Tools** | Visual Studio Code, Postman |

---

## 🏗️ High-Level System Architecture

TexTwin is organized into seven layers:

| Layer | Contents |
|---|---|
| **Physical Layer** | Weaving machines, IoT sensors (temperature, vibration, RPM, yarn tension, power, status) |
| **Edge / IoT Layer** | ESP32 gateway, MQTT protocol, TLS/SSL encryption |
| **Data Ingestion Layer** | MQTT Broker (HiveMQ), Node.js API Gateway |
| **Application / Service Layer** | Asset Management, Digital Twin Engine, AI & Analytics Engine, Alert Management, Decision Support, Reporting Service |
| **Data Layer** | MongoDB (machines, sensor data, predictions, alerts, maintenance, simulations, users, reports) |
| **Presentation Layer** | Web dashboard (React.js), optional mobile view, alerts/notifications, reports & analytics |
| **Users** | Factory Supervisor, Operator, Maintenance Engineer, Plant Manager |

**Cross-cutting concerns:** Authentication & Authorization (JWT, RBAC), Security (TLS encryption), Logging & Monitoring (ELK, Prometheus), Backup & Recovery, Scalability & Availability (load balancer, auto-scaling).

```
                   Physical Weaving Mill
        (Looms, Motors, Sensors, Operators)
                         │
                         ▼
                IoT Sensor Layer
 (Temperature, RPM, Vibration, Yarn Tension,
     Power Consumption, Fabric Output)
                         │
                         ▼
              Data Acquisition Layer
              (ESP32 / MQTT / REST API)
                         │
                         ▼
                 Cloud / Local Server
              Data Processing Pipeline
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
 Historical DB      AI Analytics      Digital Twin
                    Engine            Engine
                 - Failure Prediction
                 - Yarn Break Prediction
                 - Root Cause Analysis
                 - What-if Simulation
                         │
                         ▼
                Decision Support Engine
      - Maintenance Recommendations
      - Operational Suggestions
      - Alert Generation
                         │
                         ▼
               TexTwin Web Dashboard
```

---

## 🏗️ Low-Level Design (LLD)

### Module Breakdown
- **Authentication Module:** login, JWT, roles, permissions
- **Asset (Machine) Module:** CRUD operations for machines
- **Sensor Module:** ingest, validate, and store sensor data
- **Digital Twin Module:** maintain virtual state of machines
- **AI / Prediction Module:** run ML models, compute health & RUL
- **Alert Module:** create, manage, and close alerts
- **Maintenance Module:** maintenance plan, history, and logs
- **Simulation Module:** what-if analysis and scenario simulation
- **Report Module:** generate reports (PDF/CSV)
- **Dashboard Module:** APIs for live dashboards
- **User & Role Module:** user management, RBAC

### Core Class Diagram (Simplified)
- `Machine` (`machineId`, `name`, `type`, `location`, `status`, `healthScore`) → has many `Sensors` and `SensorData` readings
- `SensorData` (`dataId`, `machineId`, `sensorId`, `timestamp`, `temperature`, `vibration`, `rpm`, `yarnTension`, `power`, `status`) → feeds `Prediction`
- `Prediction` (`predictionId`, `machineId`, `failureProbability`, `rul`, `healthScore`, `confidence`, `recommendation`) → triggers `Alert` and informs `Maintenance`
- `Maintenance` (`maintenanceId`, `machineId`, `type`, `scheduledDate`, `completedDate`, `engineer`, `cost`, `status`)
- `Alert` (`alertId`, `machineId`, `alertType`, `severity`, `message`, `triggeredAt`, `acknowledgedBy`, `status`)
- `Simulation` → `SimulationResult` (`estimatedOutput`, `estimatedEnergy`, `estimatedDowntime`, `healthImpact`, `threadBreaks`, `deliveryImpact`)
- `User` (`userId`, `name`, `email`, `role`, `status`, `lastLogin`)

### Database Design (MongoDB Collections)
`machines`, `sensors`, `sensor_data`, `predictions`, `alerts`, `maintenance`, `simulations`, `simulation_results`, `users`, `reports`

### REST API Endpoints (Examples)
| Resource | Endpoints |
|---|---|
| **Machines** | `POST /api/machines`, `GET /api/machines`, `GET /api/machines/{id}`, `PUT /api/machines/{id}`, `DELETE /api/machines/{id}` |
| **Sensor Data** | `POST /api/sensor-data`, `GET /api/sensor-data/latest`, `GET /api/sensor-data/history`, `GET /api/sensor-data/{machineId}` |
| **Predictions** | `POST /api/predict/{machineId}`, `GET /api/predictions/{machineId}`, `GET /api/predictions/history/{id}` |
| **Alerts** | `GET /api/alerts`, `PUT /api/alerts/{id}/ack`, `PUT /api/alerts/{id}/close` |
| **Maintenance** | `POST /api/maintenance`, `GET /api/maintenance/{machineId}`, `PUT /api/maintenance/{id}` |
| **Simulations** | `POST /api/simulations`, `GET /api/simulations/{id}/results` |
| **Dashboard** | `GET /api/dashboard/live`, `GET /api/dashboard/health`, `GET /api/dashboard/energy`, `GET /api/dashboard/production` |
| **Auth** | `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout` |

### System Sequence – Live Data → Prediction → Alert
```
Sensor (ESP32) → MQTT Broker → Backend API → Database (MongoDB)
                                     │
                                     ▼
                               AI Service → Alert Engine → Dashboard
```
1. Sensor publishes data
2. MQTT forwards to backend
3. Backend validates & stores data
4. Triggers prediction engine
5. AI service checks thresholds & runs ML models
6. Alert created & notified if anomalies are detected
7. Dashboard updated in real time via WebSockets

### AI Prediction Flow
1. Collect historical data
2. Preprocess & feature engineering
3. Load ML model
4. Predict failure probability & RUL
5. Generate recommendations
6. Store prediction result

### What-if Simulation Flow
1. User selects scenario
2. Load current + historical state
3. Apply simulation rules (business + ML models)
4. Estimate impact (production, energy, health, downtime, thread breaks, delivery)
5. Compare results
6. Display simulation report

---

## ⚙️ Functional Requirements

- Asset Management
- Real-Time Sensor Monitoring
- Data Storage
- Digital Twin Synchronization
- AI Failure Prediction
- Root Cause Analysis
- What-if Simulation
- Smart Alerts & Notifications
- Dashboard Visualization
- Report Generation

---

## 🔒 Non-Functional Requirements

| Aspect | Approach |
|---|---|
| **Real-time Communication** | MQTT for low-latency sensor ingestion |
| **Scalability** | Microservices, stateless APIs, horizontal scaling |
| **Data Consistency** | Timestamps, validation, idempotent ingestion |
| **Security** | JWT authentication, RBAC, encrypted communication (TLS) |
| **Availability** | Auto-reconnect (MQTT), retry queue, health checks; 99% uptime target |
| **Maintainability** | Modular services, clear separation of concerns |
| **Observability** | Centralized logging, metrics (Prometheus), alerting |
| **Performance** | Indexed collections, aggregation pipelines, caching (Redis), dashboard updates within 1–3 seconds |
| **Extensibility** | Pluggable ML models, configurable thresholds & rules |

---

## 📂 Project Structure

```
TexTwin/
│
├── client/                 # React Frontend
│
├── server/                 # Node.js Backend
│
├── ai-model/
│   ├── prediction.py
│   ├── root_cause.py
│   └── simulation.py
│
├── docs/
│
├── architecture/
│
├── images/
│
├── presentation/
│
├── README.md
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+) and npm
- Python (3.9+) with pip
- MongoDB (local instance or Atlas connection string)

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/TexTwin.git
cd TexTwin

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Install AI model dependencies
cd ../ai-model
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in `server/` with:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MQTT_BROKER_URL=your_mqtt_broker_url
PORT=5000
```

### Running the Project
```bash
# Start backend (from /server)
npm start

# Start frontend (from /client)
npm start

# Run AI prediction service (from /ai-model)
python prediction.py
```

---

## 🚀 Project Roadmap

### Phase 1 – Research & Planning
- Industry Analysis
- Problem Identification
- Requirement Gathering

### Phase 2 – System Design
- Architecture Design
- Dashboard Design
- Database Design

### Phase 3 – Development
- React Frontend
- Node.js Backend
- MongoDB Integration
- AI Model Development
- Digital Twin Implementation

### Phase 4 – Testing
- Unit Testing
- API Testing
- Dashboard Validation
- AI Model Evaluation

### Phase 5 – Deployment
- Documentation
- GitHub Repository
- Final Demonstration

---

## 🎨 UX & Product Design Principles

TexTwin is built following user-centric design paradigms and cross-functional team collaboration:

1. **🤝 Teamwork**: UX designers collaborate with developers, product managers, and other stakeholders, making UX for product managers one of the most valuable cross-functional skills a team can invest in. They must communicate their ideas clearly, work together on design decisions, and foster a positive team environment.
2. **❤️ Empathy**: Understanding others’ perspectives, especially users’, is crucial for developing user-centric products. UX designers need to step into the user’s shoes to design experiences that truly meet their needs and expectations.
3. **💡 Creativity**: Innovation is at the heart of UX design. UX designers must think outside the box to develop unique and practical solutions that stand out.
4. **🧩 Problem-Solving**: Challenges are part of the design process. UX designers need strong problem-solving skills to identify issues and find creative, effective solutions.
5. **🔍 User Research**: Gathering insights through surveys, interviews, and usability testing is essential. UX designers rely on this research to inform their design decisions and ensure they’re aligned with user needs.
6. **📐 Prototyping**: Building interactive prototypes can help UX designers test their design ideas and gather user feedback before moving into development, saving time and resources.
7. **📊 Understanding of Business Metrics**: UX designers should be familiar with key business metrics, helping them align their work with broader business goals.

---

## 👥 Team Members

| Name | Role |
|---|---|
| **Giridharan** | Team Leader & Full-Stack Development |
| **Dinesh S** | Backend Development & API Integration |
| **Madhushri** | AI & Machine Learning |
| **Madhumitha** | Frontend Development & UI Design |

---

## 📈 Expected Outcomes

- Real-time visualization of weaving machines
- Predictive maintenance for reduced downtime
- Improved machine utilization
- Reduced maintenance costs
- Energy optimization
- Faster fault detection
- Intelligent production insights
- Improved decision-making

---

## 🔮 Future Scope

- Computer Vision for automatic fabric defect detection
- Edge AI for faster predictions
- ERP and MES integration
- Mobile application for remote monitoring
- 3D Digital Twin visualization
- Multi-factory monitoring
- Sustainability and carbon footprint analytics

---

## 📄 Day 2 Report

The Day 2 requirements, empathy study, and LeetCode/aptitude concept mapping have been moved to a dedicated document: `docs/DAY2_REPORT.md`

---

## 📜 License

This project is developed for **academic and educational purposes** as part of the **Digital Twin & AI Manufacturing Program**.

---

## 🙏 Acknowledgements

- Digital Twin & AI Manufacturing Program
- Open-source libraries and communities supporting IoT, Node.js, React, and Python AI ecosystems.
 main
