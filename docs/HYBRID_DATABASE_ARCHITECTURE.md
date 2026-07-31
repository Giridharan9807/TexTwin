# 🗄️ TexTwin – Hybrid Database Architecture Documentation
**Project**: TexTwin – AI-Powered Digital Twin for Smart Textile Weaving Industry  
**Architecture Pattern**: Hybrid Polyglot Persistence (Relational Business Data + NoSQL IoT Telemetry Stream)

---

## 📐 High-Level Architecture Overview

The TexTwin platform leverages a **Dual Hybrid Database Architecture**:

```
                       ┌──────────────────────────────────────────────┐
                       │           Node.js / Express API Gateway       │
                       └──────────────────────┬───────────────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    │                                                   │
                    ▼                                                   ▼
 ┌───────────────────────────────────────┐           ┌───────────────────────────────────────┐
 │       MySQL Database (Relational)     │           │      MongoDB Database (NoSQL Document) │
 │     `textwin_asset_management`        │           │        `textwin_digital_twin`         │
 ├───────────────────────────────────────┤           ├───────────────────────────────────────┤
 │ • Users & Auth                        │           │ • High-Volume Sensor Telemetry Stream │
 │ • Factory Plants (6 Hubs)             │           │ • AI RUL & Anomaly Predictions        │
 │ • Departments & Categories            │           │ • 3D Virtual Twin State Mirroring     │
 │ • Production Lines                    │           │ • Live Sensor Transducer Values       │
 │ • Machines & Loom Asset Registry      │           │ • Real-time Event System Logs         │
 │ • Work Orders & Maintenance Logs      │           └───────────────────────────────────────┘
 │ • Telemetry Alarm Rules & Alerts      │
 └───────────────────────────────────────┘
```

---

## 🏛️ Database 1: MySQL (`textwin_asset_management`)

### Purpose:
Stores structured, transactional business logic, asset inventory, plant hierarchies, user credentials, and maintenance schedules requiring ACID guarantees and relational foreign keys.

### Entity Relationship (ER) & Schema Overview:

- **`Users`**: `user_id` (PK), `name`, `email`, `password`, `role`, `created_at`
- **`Departments`**: `department_id` (PK), `department_name`, `manager`, `description`
- **`Categories`**: `category_id` (PK), `category_name`, `description`
- **`Plants`**: `plant_id` (PK), `plant_name`, `location`
- **`ProductionLines`**: `line_id` (PK), `plant_id` (FK -> Plants.plant_id), `line_name`
- **`Machines`**: `machine_id` (PK), `machine_code`, `machine_name`, `machine_type`, `manufacturer`, `model_number`, `serial_number`, `installation_date`, `purchase_cost`, `warranty_expiry`, `plant_id` (FK), `department_id` (FK), `category_id` (FK), `production_line_id` (FK), `location`, `status`, `criticality`, `health_score`, `operator`, `maintenance_engineer`, `created_at`, `updated_at`
- **`Maintenance`**: `maintenance_id` (PK), `machine_id` (FK -> Machines.machine_id), `maintenance_type`, `engineer`, `start_date`, `end_date`, `remarks`, `status`
- **`Alerts`**: `alert_id` (PK), `machine_id` (FK -> Machines.machine_id), `severity`, `alert_type`, `description`, `status`, `created_at`

*SQL DDL Script Location*: [`database/schema.sql`](file:///d:/TexTwin/Digital-Twin-Textile/database/schema.sql)

---

## 🍃 Database 2: MongoDB (`textwin_digital_twin`)

### Purpose:
Stores high-frequency, time-series IoT sensor streams, unstructured AI predictions, remaining useful life (RUL) matrices, and live 3D Digital Twin virtual mirror states.

### Collections Overview:

1. **`sensorData`**: `machineId`, `timestamp`, `temperature`, `rpm`, `vibration`, `humidity`, `pressure`, `power`, `current`, `airFlow`, `yarnTension`, `energyConsumption`, `machineHealth`
2. **`predictions`**: `machineId`, `predictionTime`, `failureProbability`, `remainingUsefulLife`, `healthScore`, `recommendation`
3. **`digitalTwin`**: `machineId`, `currentStatus`, `syncTime`, `virtualHealth`, `performanceScore`, `efficiency`
4. **`liveTelemetry`**: `machineId`, `sensorValues`, `updatedAt`
5. **`systemLogs`**: `machineId`, `eventType`, `message`, `timestamp`

---

## 🔗 Node.js Express Hybrid API Endpoints

### MySQL Relational Asset APIs:
- `GET /api/assets` — Retrieve all weaving loom assets from MySQL
- `GET /api/assets/:id` — Retrieve asset details by ID
- `POST /api/assets` — Create new asset record in MySQL
- `PUT /api/assets/:id` — Update asset parameters in MySQL
- `DELETE /api/assets/:id` — Delete asset record
- `GET /api/departments` — List departments
- `GET /api/categories` — List loom categories
- `GET /api/plants` — List regional plant hubs

### MongoDB Telemetry & AI APIs:
- `GET /api/sensors` — High-volume sensor telemetry feed stream
- `POST /api/sensors` — Ingest sensor telemetry sample
- `GET /api/sensors/:machineId` — Telemetry history for a specific loom
- `GET /api/predictions` — AI RUL & failure probability matrix
- `GET /api/predictions/:machineId` — Machine-specific AI diagnostics
- `GET /api/digitalTwin` — 3D Virtual Twin state mirror
- `GET /api/liveTelemetry` — Live transducer stream metadata
