-- ====================================================
-- TexTwin – AI-Powered Digital Twin for Textile Industry
-- Database 1: MySQL Relational Asset Management Schema
-- Database Name: textwin_asset_management
-- ====================================================

CREATE DATABASE IF NOT EXISTS textwin_asset_management;
USE textwin_asset_management;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Plant Manager',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Departments Table
CREATE TABLE IF NOT EXISTS Departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    manager VARCHAR(100),
    description TEXT
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 4. Plants Table
CREATE TABLE IF NOT EXISTS Plants (
    plant_id INT AUTO_INCREMENT PRIMARY KEY,
    plant_name VARCHAR(150) NOT NULL,
    location VARCHAR(150) NOT NULL
);

-- 5. ProductionLines Table
CREATE TABLE IF NOT EXISTS ProductionLines (
    line_id INT AUTO_INCREMENT PRIMARY KEY,
    plant_id INT NOT NULL,
    line_name VARCHAR(150) NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id) ON DELETE CASCADE
);

-- 6. Machines Table
CREATE TABLE IF NOT EXISTS Machines (
    machine_id INT AUTO_INCREMENT PRIMARY KEY,
    machine_code VARCHAR(50) UNIQUE NOT NULL,
    machine_name VARCHAR(150) NOT NULL,
    machine_type VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100),
    model_number VARCHAR(100),
    serial_number VARCHAR(100),
    installation_date DATE,
    purchase_cost DECIMAL(12,2),
    warranty_expiry DATE,
    plant_id INT,
    department_id INT,
    category_id INT,
    production_line_id INT,
    location VARCHAR(150),
    status VARCHAR(30) DEFAULT 'Running',
    criticality VARCHAR(20) DEFAULT 'High',
    health_score INT DEFAULT 96,
    operator VARCHAR(100),
    maintenance_engineer VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE SET NULL,
    FOREIGN KEY (production_line_id) REFERENCES ProductionLines(line_id) ON DELETE SET NULL
);

-- 7. Maintenance Table
CREATE TABLE IF NOT EXISTS Maintenance (
    maintenance_id INT AUTO_INCREMENT PRIMARY KEY,
    machine_id INT NOT NULL,
    maintenance_type VARCHAR(100) NOT NULL,
    engineer VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    remarks TEXT,
    status VARCHAR(30) DEFAULT 'Scheduled',
    FOREIGN KEY (machine_id) REFERENCES Machines(machine_id) ON DELETE CASCADE
);

-- 8. Alerts Table
CREATE TABLE IF NOT EXISTS Alerts (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    machine_id INT NOT NULL,
    severity VARCHAR(20) NOT NULL,
    alert_type VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(30) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (machine_id) REFERENCES Machines(machine_id) ON DELETE CASCADE
);

-- Seed Initial MySQL Data
INSERT INTO Plants (plant_id, plant_name, location) VALUES
(1, 'TexTwin Primary Mill', 'Coimbatore Hub'),
(2, 'TexTwin Technical Fabrics', 'Tirupur Facility'),
(3, 'TexTwin Denim Weaving', 'Gujarat Hub'),
(4, 'TexTwin Silk & Jacquard Unit', 'Kanchipuram Hub'),
(5, 'TexTwin Eco-Cotton Mill', 'Salem Hub'),
(6, 'TexTwin Synthetic Complex', 'Surat Hub')
ON DUPLICATE KEY UPDATE plant_name=VALUES(plant_name);

INSERT INTO Departments (department_id, department_name, manager, description) VALUES
(1, 'High-Speed Weaving', 'Anita Desai', 'Air Jet & Rapier High-Speed Production'),
(2, 'Jacquard Weaving', 'Manoj Kumar', 'Intricate Pattern Brocades & Fancy Fabrics'),
(3, 'Heavy Technical Fabrics', 'Suresh Mehta', 'Industrial Canvas & Reinforcement Fabrics'),
(4, 'Synthetic Filament Division', 'Sanjay Shah', 'High Tenacity Polyester & Nylon Weaving')
ON DUPLICATE KEY UPDATE department_name=VALUES(department_name);

INSERT INTO Categories (category_id, category_name, description) VALUES
(1, 'Air Jet Looms', 'Pneumatic Weft Insertion Looms (900-1200 RPM)'),
(2, 'Rapier Looms', 'Mechanical Flexible/Rigid Rapier Looms'),
(3, 'Water Jet Looms', 'Hydrophobic Filament Weaving Looms')
ON DUPLICATE KEY UPDATE category_name=VALUES(category_name);
