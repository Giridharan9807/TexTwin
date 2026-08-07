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

