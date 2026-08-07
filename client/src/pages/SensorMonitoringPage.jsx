import React, { useState } from 'react';
import {
  Radio,
  Thermometer,
  Activity,
  Zap,
  Gauge,
  Wind,
  Droplets,
  Search,
  RefreshCw,
  Sliders,
  Eye,
  Camera,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Database,
  Crosshair,
  X,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sparkline = ({ data = [10, 15, 12, 18, 20, 16, 22], color = '#10b981', width = 75, height = 28 }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

const SensorMonitoringPage = () => {
  const navigate = useNavigate();
  const [selectedSensorIndex, setSelectedSensorIndex] = useState(0);
  const [activeModalSensor, setActiveModalSensor] = useState(null); // Modal state for deep sensor inspection across machines
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // 18 WEAVING MACHINE SENSORS CATALOG WITH COMPONENT PLACEMENTS & MACHINE BREAKDOWN
  const sensorCatalog = [
    {
      num: 1,
      title: 'Temperature Sensor',
      icon: Thermometer,
      purpose: 'Monitors motor, bearing, and gearbox temperature',
      unit: '°C',
      range: '40 – 70 °C',
      color: '#2563EB',
      hardwareModel: 'Ifm Electronic TA2502 PT100 Probe',
      placement: 'Main Motor Housing & Shaft Bearing',
      mqttTopic: 'textwin/telemetry/temperature',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '52.4 °C', status: 'Nominal', component: 'Motor Drive Bearing #1', spark: [48, 50, 51, 53, 52, 52.4] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '54.1 °C', status: 'Nominal', component: 'Gearbox Lube Reservoir', spark: [50, 52, 53, 54, 53.8, 54.1] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '49.8 °C', status: 'Nominal', component: 'Main Shaft Bearing', spark: [46, 48, 49, 50, 49.5, 49.8] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '58.2 °C', status: 'Nominal', component: 'High-Pressure Water Pump', spark: [54, 56, 57, 58, 58.0, 58.2] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '51.0 °C', status: 'Nominal', component: 'Jacquard Harness Motor', spark: [48, 49, 50, 51, 50.8, 51.0] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '82.4 °C', status: 'Critical Risk', component: 'Main Shaft Drive Bearing', spark: [64, 70, 75, 80, 81.5, 82.4] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '53.0 °C', status: 'Nominal', component: 'Rapier Drive Gear', spark: [50, 51, 52, 52.8, 53.0, 53.0] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '50.5 °C', status: 'Nominal', component: 'Air Compressor Housing', spark: [48, 49, 50, 50.2, 50.5, 50.5] },
      ],
    },
    {
      num: 2,
      title: 'Vibration Sensor',
      icon: Activity,
      purpose: 'Detects bearing wear, imbalance, and misalignment',
      unit: 'mm/s',
      range: '< 0.35 mm/s',
      color: '#8B5CF6',
      hardwareModel: 'Hansford Sensors HS-100 3-Axis Accelerometer',
      placement: 'Drive Shaft Frame & Bearing Blocks',
      mqttTopic: 'textwin/telemetry/vibration',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '0.18 mm/s', status: 'Optimal', component: 'Shaft Bearing Mount A', spark: [0.25, 0.22, 0.20, 0.19, 0.18, 0.18] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '0.21 mm/s', status: 'Optimal', component: 'Flexible Tape Housing', spark: [0.24, 0.23, 0.22, 0.21, 0.21, 0.21] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '0.14 mm/s', status: 'Optimal', component: 'Dobby Shedding Motion', spark: [0.18, 0.16, 0.15, 0.14, 0.14, 0.14] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '0.28 mm/s', status: 'Caution', component: 'Nozzle Pump Mount', spark: [0.20, 0.24, 0.26, 0.27, 0.28, 0.28] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '0.19 mm/s', status: 'Optimal', component: 'Crankshaft Bearing B', spark: [0.22, 0.20, 0.19, 0.19, 0.19, 0.19] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '0.42 mm/s', status: 'Critical Risk', component: 'Main Drive Shaft Bearing', spark: [0.28, 0.32, 0.36, 0.40, 0.41, 0.42] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '0.20 mm/s', status: 'Optimal', component: 'Main Pulley Mount', spark: [0.22, 0.21, 0.20, 0.20, 0.20, 0.20] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '0.17 mm/s', status: 'Optimal', component: 'Reed Frame Support', spark: [0.19, 0.18, 0.17, 0.17, 0.17, 0.17] },
      ],
    },
    {
      num: 3,
      title: 'RPM (Tachometer) Sensor',
      icon: Gauge,
      purpose: 'Measures loom and main shaft rotation speed',
      unit: 'RPM',
      range: '900 – 1,200 RPM',
      color: '#2563EB',
      hardwareModel: 'Omron E6B2-CWZ Rotary Tachometer',
      placement: 'Main Drive Shaft Pulley',
      mqttTopic: 'textwin/telemetry/rpm',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '1,080 RPM', status: 'Optimal', component: 'Main Pulley Shaft', spark: [1020, 1050, 1080, 1075, 1082, 1080] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '1,050 RPM', status: 'Optimal', component: 'Rapier Drive Shaft', spark: [1040, 1050, 1050, 1048, 1052, 1050] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '1,120 RPM', status: 'High Speed', component: 'Dobby Crankshaft', spark: [1100, 1115, 1120, 1118, 1122, 1120] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '0 RPM', status: 'Standby / Idle', component: 'Main Pump Encoder', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '1,060 RPM', status: 'Optimal', component: 'Jacquard Drive Shaft', spark: [1050, 1055, 1060, 1058, 1062, 1060] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '920 RPM', status: 'Maintenance', component: 'Main Shaft Pulley', spark: [1020, 980, 950, 930, 925, 920] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '1,070 RPM', status: 'Optimal', component: 'Drive Motor Shaft', spark: [1060, 1065, 1070, 1070, 1070, 1070] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '1,090 RPM', status: 'Optimal', component: 'Main Pulley Shaft', spark: [1080, 1085, 1090, 1090, 1090, 1090] },
      ],
    },
    {
      num: 4,
      title: 'Yarn Tension Sensor',
      icon: Radio,
      purpose: 'Monitors warp and weft yarn tension',
      unit: 'cN',
      range: '15 – 22 cN',
      color: '#16A34A',
      hardwareModel: 'REell Tensometer TENS-200 Load Transducer',
      placement: 'Warp Beam Roller & Weft Feeder Eye',
      mqttTopic: 'textwin/telemetry/yarn_tension',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '18.2 cN', status: 'Nominal', component: 'Warp Tension Roller', spark: [17.5, 18.0, 18.5, 18.1, 18.3, 18.2] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '19.0 cN', status: 'Nominal', component: 'Weft Accumulator Eye', spark: [18.2, 18.8, 19.1, 18.9, 19.0, 19.0] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '17.8 cN', status: 'Nominal', component: 'Warp Beam Load Roller', spark: [17.0, 17.5, 17.8, 17.6, 17.7, 17.8] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '15.4 cN', status: 'Low Tension', component: 'Water Jet Warp Guide', spark: [16.0, 15.8, 15.5, 15.4, 15.4, 15.4] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '18.5 cN', status: 'Nominal', component: 'Harness Cord Tensioner', spark: [18.0, 18.4, 18.6, 18.5, 18.5, 18.5] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '24.8 cN', status: 'High Tension Alert', component: 'Warp Tension Roller', spark: [20.0, 21.5, 23.0, 24.0, 24.5, 24.8] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '18.4 cN', status: 'Nominal', component: 'Weft Feeder Eye', spark: [18.0, 18.2, 18.4, 18.4, 18.4, 18.4] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '17.9 cN', status: 'Nominal', component: 'Main Warp Beam Roller', spark: [17.5, 17.7, 17.9, 17.9, 17.9, 17.9] },
      ],
    },
    {
      num: 5,
      title: 'Air Pressure Sensor',
      icon: Wind,
      purpose: 'Measures compressed air pressure in Air Jet Looms',
      unit: 'Bar',
      range: '5.5 – 7.0 Bar',
      color: '#0284C7',
      hardwareModel: 'SMC PSE540 Pressure Transducer',
      placement: 'Main Nozzle Pneumatic Manifold',
      mqttTopic: 'textwin/telemetry/air_pressure',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '6.2 Bar', status: 'Stable', component: 'Main Nozzle Manifold', spark: [6.0, 6.1, 6.3, 6.2, 6.1, 6.2] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '5.8 Bar', status: 'Stable', component: 'Relay Nozzle Bank 1', spark: [5.6, 5.7, 5.8, 5.8, 5.8, 5.8] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '6.5 Bar', status: 'Optimal', component: 'Main Pneumatic Header', spark: [6.2, 6.4, 6.5, 6.5, 6.5, 6.5] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '0.0 Bar', status: 'N/A (Water Jet)', component: 'N/A', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '6.1 Bar', status: 'Stable', component: 'Main Nozzle Header', spark: [6.0, 6.0, 6.1, 6.1, 6.1, 6.1] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '4.8 Bar', status: 'Low Pressure Alert', component: 'Compressed Air Line', spark: [5.4, 5.2, 5.0, 4.9, 4.8, 4.8] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '6.0 Bar', status: 'Stable', component: 'Relay Nozzle Manifold', spark: [5.9, 6.0, 6.0, 6.0, 6.0, 6.0] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '6.3 Bar', status: 'Optimal', component: 'Main Nozzle Tank', spark: [6.1, 6.2, 6.3, 6.3, 6.3, 6.3] },
      ],
    },
    {
      num: 6,
      title: 'Air Flow Sensor',
      icon: Wind,
      purpose: 'Monitors air flow rate to main & relay nozzles',
      unit: 'L/min',
      range: '120 – 180 L/min',
      color: '#06B6D4',
      hardwareModel: 'Festo SFAH Micro Thermal Air Flow Sensor',
      placement: 'Main Nozzle Air Line',
      mqttTopic: 'textwin/telemetry/air_flow',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '145 L/min', status: 'Optimal', component: 'Main Nozzle Supply Line', spark: [140, 142, 145, 144, 145, 145] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '138 L/min', status: 'Optimal', component: 'Relay Air Line', spark: [135, 136, 138, 138, 137, 138] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '152 L/min', status: 'Optimal', component: 'Nozzle Header Line', spark: [148, 150, 152, 151, 152, 152] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '0 L/min', status: 'N/A', component: 'N/A', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '142 L/min', status: 'Optimal', component: 'Main Nozzle Line', spark: [140, 141, 142, 142, 142, 142] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '110 L/min', status: 'Sub-Optimal', component: 'Nozzle Tank Supply', spark: [130, 125, 120, 115, 112, 110] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '140 L/min', status: 'Optimal', component: 'Relay Air Line', spark: [138, 139, 140, 140, 140, 140] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '148 L/min', status: 'Optimal', component: 'Main Nozzle Supply', spark: [145, 146, 148, 148, 148, 148] },
      ],
    },
    {
      num: 7,
      title: 'Current Sensor',
      icon: Zap,
      purpose: 'Measures motor drive current consumption',
      unit: 'A',
      range: '25 – 40 A',
      color: '#D97706',
      hardwareModel: 'LEM CAS 25-NP Current Transformer',
      placement: 'Main Drive Motor Inverter Feed',
      mqttTopic: 'textwin/telemetry/current',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '32.5 A', status: 'Nominal', component: 'Motor Inverter Feed A', spark: [31.0, 32.0, 33.0, 32.2, 32.6, 32.5] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '30.8 A', status: 'Nominal', component: 'Drive Motor Inverter', spark: [30.0, 30.5, 30.8, 30.7, 30.8, 30.8] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '34.1 A', status: 'Nominal', component: 'Main Shaft Motor', spark: [33.0, 33.8, 34.2, 34.0, 34.1, 34.1] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '4.2 A', status: 'Standby Draw', component: 'Auxiliary Water Pump', spark: [4.0, 4.1, 4.2, 4.2, 4.2, 4.2] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '31.9 A', status: 'Nominal', component: 'Jacquard Servo Drive', spark: [31.0, 31.5, 31.9, 31.8, 31.9, 31.9] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '42.8 A', status: 'Overcurrent Risk', component: 'Main Drive Motor', spark: [35.0, 38.0, 40.0, 41.5, 42.0, 42.8] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '31.2 A', status: 'Nominal', component: 'Drive Motor Inverter', spark: [30.5, 31.0, 31.2, 31.2, 31.2, 31.2] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '32.0 A', status: 'Nominal', component: 'Main Motor Inverter', spark: [31.5, 31.8, 32.0, 32.0, 32.0, 32.0] },
      ],
    },
    {
      num: 8,
      title: 'Voltage Sensor',
      icon: Zap,
      purpose: 'Monitors electrical supply voltage stability',
      unit: 'V',
      range: '400 – 420 V (3-Phase)',
      color: '#EAB308',
      hardwareModel: 'Phoenix Contact MACX Voltage Transducer',
      placement: 'Main Control Panel Busbar',
      mqttTopic: 'textwin/telemetry/voltage',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '415.2 V', status: 'Stable', component: 'Control Panel Busbar A', spark: [414, 415, 415.5, 415.1, 415.2, 415.2] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '414.8 V', status: 'Stable', component: 'Control Panel Busbar B', spark: [414, 414.5, 415, 414.8, 414.8, 414.8] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '416.0 V', status: 'Stable', component: 'Control Panel Busbar C', spark: [415, 415.8, 416, 416, 416, 416] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '415.0 V', status: 'Stable', component: 'Control Panel Busbar D', spark: [415, 415, 415, 415, 415, 415] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '414.5 V', status: 'Stable', component: 'Jacquard Power Supply', spark: [414, 414.2, 414.5, 414.5, 414.5, 414.5] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '412.0 V', status: 'Nominal', component: 'Control Panel Busbar E', spark: [414, 413, 412.5, 412.0, 412.0, 412.0] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '415.0 V', status: 'Stable', component: 'Control Panel Busbar F', spark: [414.5, 415, 415, 415, 415, 415] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '415.4 V', status: 'Stable', component: 'Main Control Panel', spark: [415, 415.2, 415.4, 415.4, 415.4, 415.4] },
      ],
    },
    {
      num: 9,
      title: 'Power/Energy Meter',
      icon: Zap,
      purpose: 'Measures power (kW) and energy (kWh) consumption',
      unit: 'kW',
      range: '12 – 20 kW',
      color: '#7C3AED',
      hardwareModel: 'Schneider Electric IEM3255 Digital Meter',
      placement: 'Main Machine Power Feed',
      mqttTopic: 'textwin/telemetry/energy',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '16.4 kW', status: 'Efficient', component: 'Main Power Meter Feed', spark: [18.2, 17.5, 17.0, 16.8, 16.5, 16.4] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '15.8 kW', status: 'Efficient', component: 'Main Drive Meter', spark: [16.2, 16.0, 15.9, 15.8, 15.8, 15.8] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '17.2 kW', status: 'Optimal', component: 'Main Drive Meter', spark: [17.5, 17.3, 17.2, 17.2, 17.2, 17.2] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '1.8 kW', status: 'Baseload', component: 'Standby Power Meter', spark: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '16.0 kW', status: 'Efficient', component: 'Jacquard Drive Meter', spark: [16.5, 16.2, 16.0, 16.0, 16.0, 16.0] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '21.5 kW', status: 'High Energy Load', component: 'Main Power Feed', spark: [18.0, 19.5, 20.2, 21.0, 21.3, 21.5] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '15.9 kW', status: 'Efficient', component: 'Main Drive Meter', spark: [16.1, 16.0, 15.9, 15.9, 15.9, 15.9] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '16.5 kW', status: 'Efficient', component: 'Main Power Meter', spark: [16.8, 16.6, 16.5, 16.5, 16.5, 16.5] },
      ],
    },
    {
      num: 10,
      title: 'Humidity Sensor',
      icon: Droplets,
      purpose: 'Monitors factory humidity for yarn quality & strength',
      unit: '% RH',
      range: '60 – 70% RH',
      color: '#059669',
      hardwareModel: 'Vaisala HMT330 Industrial Humidity Probe',
      placement: 'Loom Weaving Shed Enclosure',
      mqttTopic: 'textwin/telemetry/humidity',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '65% RH', status: 'Ideal Weaving', component: 'Warp Shed Duct A', spark: [63, 64, 66, 65, 65, 65] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '64% RH', status: 'Ideal Weaving', component: 'Warp Shed Duct B', spark: [64, 64, 65, 64, 64, 64] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '66% RH', status: 'Ideal Weaving', component: 'Warp Shed Duct C', spark: [65, 66, 67, 66, 66, 66] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '68% RH', status: 'Optimal', component: 'Water Jet Shed Area', spark: [67, 68, 68, 68, 68, 68] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '65% RH', status: 'Ideal Weaving', component: 'Jacquard Shed Area', spark: [64, 65, 65, 65, 65, 65] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '58% RH', status: 'Low Shed Humidity', component: 'Warp Beam Intake', spark: [62, 60, 59, 58, 58, 58] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '65% RH', status: 'Ideal Weaving', component: 'Warp Shed Duct D', spark: [64, 65, 65, 65, 65, 65] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '66% RH', status: 'Ideal Weaving', component: 'Main Shed Air Outlet', spark: [65, 66, 66, 66, 66, 66] },
      ],
    },
    {
      num: 11,
      title: 'Ambient Temperature Sensor',
      icon: Thermometer,
      purpose: 'Measures surrounding factory plant temperature',
      unit: '°C',
      range: '24 – 34 °C',
      color: '#F59E0B',
      hardwareModel: 'Bosch BME280 Environmental Sensor',
      placement: 'Loom Bay Surrounding Environment',
      mqttTopic: 'textwin/telemetry/ambient_temp',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '28.5 °C', status: 'Controlled', component: 'Bay 1 Ambient Sensor', spark: [28, 28.2, 28.5, 28.4, 28.5, 28.5] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '28.8 °C', status: 'Controlled', component: 'Bay 1 Ambient Sensor', spark: [28.5, 28.7, 28.8, 28.8, 28.8, 28.8] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '27.9 °C', status: 'Controlled', component: 'Bay 2 Ambient Sensor', spark: [27.5, 27.8, 27.9, 27.9, 27.9, 27.9] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '29.2 °C', status: 'Controlled', component: 'Bay 2 Ambient Sensor', spark: [29, 29.1, 29.2, 29.2, 29.2, 29.2] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '28.4 °C', status: 'Controlled', component: 'Bay 3 Ambient Sensor', spark: [28, 28.2, 28.4, 28.4, 28.4, 28.4] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '35.6 °C', status: 'High Ambient Temp', component: 'Bay 4 Exhaust Duct', spark: [31, 33, 34.5, 35.2, 35.5, 35.6] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '28.6 °C', status: 'Controlled', component: 'Bay 4 Ambient Sensor', spark: [28, 28.3, 28.6, 28.6, 28.6, 28.6] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '28.2 °C', status: 'Controlled', component: 'Bay 1 Ambient Sensor', spark: [28, 28.1, 28.2, 28.2, 28.2, 28.2] },
      ],
    },
    {
      num: 12,
      title: 'Oil Level Sensor',
      icon: Database,
      purpose: 'Monitors main gearbox lubrication oil level',
      unit: '% Full',
      range: '75 – 100%',
      color: '#16A34A',
      hardwareModel: 'Sick LFP Cubic Guided Radar Level Sensor',
      placement: 'Main Gearbox Oil Sump',
      mqttTopic: 'textwin/telemetry/oil_level',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '94% Full', status: 'Optimal Level', component: 'Main Gearbox Sump', spark: [95, 95, 94, 94, 94, 94] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '92% Full', status: 'Optimal Level', component: 'Rapier Gear Reservoir', spark: [93, 93, 92, 92, 92, 92] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '98% Full', status: 'Optimal Level', component: 'Dobby Motion Sump', spark: [99, 99, 98, 98, 98, 98] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '88% Full', status: 'Optimal Level', component: 'Water Pump Gearbox', spark: [89, 89, 88, 88, 88, 88] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '95% Full', status: 'Optimal Level', component: 'Jacquard Gear Sump', spark: [96, 96, 95, 95, 95, 95] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '64% Full', status: 'Low Lube Warning', component: 'Drive Shaft Oil Sump', spark: [80, 75, 70, 66, 65, 64] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '93% Full', status: 'Optimal Level', component: 'Rapier Drive Sump', spark: [94, 94, 93, 93, 93, 93] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '96% Full', status: 'Optimal Level', component: 'Main Gearbox Sump', spark: [97, 97, 96, 96, 96, 96] },
      ],
    },
    {
      num: 13,
      title: 'Oil Pressure Sensor',
      icon: Database,
      purpose: 'Monitors lubrication system oil pressure',
      unit: 'Bar',
      range: '2.0 – 3.5 Bar',
      color: '#2563EB',
      hardwareModel: 'Danfoss MBS 3000 Pressure Transmitter',
      placement: 'Gearbox Lubrication Line',
      mqttTopic: 'textwin/telemetry/oil_pressure',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '2.8 Bar', status: 'Optimal', component: 'Main Lube Line A', spark: [2.7, 2.8, 2.8, 2.8, 2.8, 2.8] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '2.9 Bar', status: 'Optimal', component: 'Lube Line B', spark: [2.8, 2.9, 2.9, 2.9, 2.9, 2.9] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '3.1 Bar', status: 'Optimal', component: 'Lube Line C', spark: [3.0, 3.1, 3.1, 3.1, 3.1, 3.1] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '2.6 Bar', status: 'Optimal', component: 'Water Pump Lube Line', spark: [2.5, 2.6, 2.6, 2.6, 2.6, 2.6] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '2.8 Bar', status: 'Optimal', component: 'Jacquard Lube Header', spark: [2.7, 2.8, 2.8, 2.8, 2.8, 2.8] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '1.6 Bar', status: 'Low Oil Pressure Risk', component: 'Drive Shaft Lube Line', spark: [2.4, 2.1, 1.9, 1.7, 1.6, 1.6] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '2.8 Bar', status: 'Optimal', component: 'Lube Line D', spark: [2.7, 2.8, 2.8, 2.8, 2.8, 2.8] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '3.0 Bar', status: 'Optimal', component: 'Main Lube Line A', spark: [2.9, 3.0, 3.0, 3.0, 3.0, 3.0] },
      ],
    },
    {
      num: 14,
      title: 'Rotary Encoder',
      icon: Sliders,
      purpose: 'Measures shaft position, angle, and rotation speed',
      unit: 'Degrees (°)',
      range: '0 – 360° Synchronized',
      color: '#2563EB',
      hardwareModel: 'Baumer Electric Industrial Absolute Encoder',
      placement: 'Main Shaft Angle Synchronizer',
      mqttTopic: 'textwin/telemetry/encoder_angle',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '184° Synced', status: 'Phase Locked', component: 'Main Shaft Angle Hub', spark: [0, 90, 180, 270, 360, 184] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '120° Synced', status: 'Phase Locked', component: 'Rapier Timing Shaft', spark: [0, 90, 180, 270, 360, 120] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '310° Synced', status: 'Phase Locked', component: 'Dobby Sync Hub', spark: [0, 90, 180, 270, 360, 310] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '0° Standby', status: 'Paused', component: 'Water Jet Encoder', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '240° Synced', status: 'Phase Locked', component: 'Jacquard Sync Encoder', spark: [0, 90, 180, 270, 360, 240] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '45° Phase Lag', status: 'Angle Shift Warning', component: 'Drive Shaft Timing Hub', spark: [0, 80, 160, 240, 320, 45] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '180° Synced', status: 'Phase Locked', component: 'Main Shaft Angle Hub', spark: [0, 90, 180, 270, 360, 180] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '190° Synced', status: 'Phase Locked', component: 'Main Shaft Angle Hub', spark: [0, 90, 180, 270, 360, 190] },
      ],
    },
    {
      num: 15,
      title: 'Proximity Sensor',
      icon: Crosshair,
      purpose: 'Detects roller, fabric, and component positions',
      unit: 'Binary',
      range: 'Active Trigger High',
      color: '#16A34A',
      hardwareModel: 'Pepperl+Fuchs Inductive Proximity Switch',
      placement: 'Fabric Roller & Shuttleless Reed Limit',
      mqttTopic: 'textwin/telemetry/proximity',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: 'HIGH (Active)', status: 'Normal Trigger', component: 'Fabric Take-up Roller', spark: [1, 0, 1, 0, 1, 1] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: 'HIGH (Active)', status: 'Normal Trigger', component: 'Rapier Flexible Tape Limit', spark: [1, 0, 1, 0, 1, 1] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: 'HIGH (Active)', status: 'Normal Trigger', component: 'Heald Frame Limit', spark: [1, 0, 1, 0, 1, 1] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: 'LOW (Idle)', status: 'Standby', component: 'Water Nozzle Lever', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: 'HIGH (Active)', status: 'Normal Trigger', component: 'Jacquard Harness Limit', spark: [1, 0, 1, 0, 1, 1] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: 'HIGH (Active)', status: 'Normal Trigger', component: 'Reed Frame Position', spark: [1, 0, 1, 0, 1, 1] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: 'HIGH (Active)', status: 'Normal Trigger', component: 'Fabric Roller Limit', spark: [1, 0, 1, 0, 1, 1] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: 'HIGH (Active)', status: 'Normal Trigger', component: 'Take-up Roller', spark: [1, 0, 1, 0, 1, 1] },
      ],
    },
    {
      num: 16,
      title: 'Photoelectric / Yarn Break Sensor',
      icon: Eye,
      purpose: 'Detects yarn breakage and thread presence in real-time',
      unit: 'Breaks/hr',
      range: '0 Breakages',
      color: '#10B981',
      hardwareModel: 'Keyence LR-T Laser Optical Yarn Sensor',
      placement: 'Warp Thread Detector Bank & Weft Eye',
      mqttTopic: 'textwin/telemetry/yarn_breaks',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '0 Breaks / hr', status: 'Zero Defect', component: 'Warp Thread Detector A', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '0 Breaks / hr', status: 'Zero Defect', component: 'Weft Optical Eye', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '0 Breaks / hr', status: 'Zero Defect', component: 'Warp Thread Detector B', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '0 Breaks / hr', status: 'Idle', component: 'Water Jet Thread Eye', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '0 Breaks / hr', status: 'Zero Defect', component: 'Jacquard Harness Eye', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '2 Breaks / hr', status: 'Yarn Break Alert', component: 'Warp Tension Thread Bank', spark: [0, 0, 1, 1, 2, 2] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '0 Breaks / hr', status: 'Zero Defect', component: 'Weft Feeder Eye', spark: [0, 0, 0, 0, 0, 0] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '0 Breaks / hr', status: 'Zero Defect', component: 'Main Warp Thread Bank', spark: [0, 0, 0, 0, 0, 0] },
      ],
    },
    {
      num: 17,
      title: 'Vision Camera (Machine Vision)',
      icon: Camera,
      purpose: 'Detects fabric defects, missing picks, stains, and holes',
      unit: 'AI Inspection',
      range: '100% Quality Pass',
      color: '#7C3AED',
      hardwareModel: 'Cognex In-Sight 8000 High-Speed Fabric Vision System',
      placement: 'Fabric Take-up Beam Scanner',
      mqttTopic: 'textwin/telemetry/vision_inspection',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '99.4% Pass', status: 'Grade A Fabric', component: 'Beam Optical Scanner', spark: [99, 99.2, 99.4, 99.4, 99.4, 99.4] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '99.1% Pass', status: 'Grade A Fabric', component: 'Selvage Quality Camera', spark: [99, 99.0, 99.1, 99.1, 99.1, 99.1] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '99.8% Pass', status: 'Grade A+ Fabric', component: 'Dobby Weave Inspector', spark: [99.5, 99.7, 99.8, 99.8, 99.8, 99.8] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '100% Pass', status: 'Standby Pass', component: 'Water Jet Defect Camera', spark: [100, 100, 100, 100, 100, 100] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '99.2% Pass', status: 'Grade A Fabric', component: 'Pattern Inspection Camera', spark: [99, 99.1, 99.2, 99.2, 99.2, 99.2] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '96.2% Pass', status: 'Stain Defect Detected', component: 'Main Fabric Roll Camera', spark: [98, 97.5, 97.0, 96.5, 96.2, 96.2] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '99.3% Pass', status: 'Grade A Fabric', component: 'Take-up Fabric Camera', spark: [99, 99.2, 99.3, 99.3, 99.3, 99.3] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '99.5% Pass', status: 'Grade A+ Fabric', component: 'Beam Optical Scanner', spark: [99.2, 99.4, 99.5, 99.5, 99.5, 99.5] },
      ],
    },
    {
      num: 18,
      title: 'Load Cell',
      icon: Gauge,
      purpose: 'Measures warp beam load and yarn tension accurately',
      unit: 'kN',
      range: '2.5 – 4.0 kN',
      color: '#059669',
      hardwareModel: 'HBM C9C Subminiature Force Transducer Load Cell',
      placement: 'Warp Beam Shaft Mounting Bracket',
      mqttTopic: 'textwin/telemetry/load_cell',
      machineData: [
        { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', val: '3.2 kN', status: 'Nominal Load', component: 'Warp Beam Load Cell A', spark: [3.0, 3.1, 3.2, 3.2, 3.2, 3.2] },
        { machineId: 'LOOM-102', name: 'Picanol Rapier Beta', val: '3.4 kN', status: 'Nominal Load', component: 'Warp Beam Load Cell B', spark: [3.2, 3.3, 3.4, 3.4, 3.4, 3.4] },
        { machineId: 'LOOM-103', name: 'Staubli High-Speed Dobby', val: '3.1 kN', status: 'Nominal Load', component: 'Warp Beam Load Cell C', spark: [3.0, 3.1, 3.1, 3.1, 3.1, 3.1] },
        { machineId: 'LOOM-104', name: 'Tsudakoma Water Jet', val: '2.8 kN', status: 'Nominal Load', component: 'Water Beam Tension Cell', spark: [2.7, 2.8, 2.8, 2.8, 2.8, 2.8] },
        { machineId: 'LOOM-105', name: 'Itema R9500 Jacquard', val: '3.3 kN', status: 'Nominal Load', component: 'Jacquard Beam Cell', spark: [3.1, 3.2, 3.3, 3.3, 3.3, 3.3] },
        { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', val: '4.6 kN', status: 'High Warp Tension', component: 'Main Warp Shaft Load Cell', spark: [3.8, 4.0, 4.2, 4.4, 4.5, 4.6] },
        { machineId: 'LOOM-202', name: 'Picanol GTMax-i Rapier', val: '3.2 kN', status: 'Nominal Load', component: 'Warp Beam Load Cell D', spark: [3.0, 3.1, 3.2, 3.2, 3.2, 3.2] },
        { machineId: 'LOOM-203', name: 'Toyota JAT810 Air Jet', val: '3.3 kN', status: 'Nominal Load', component: 'Warp Beam Load Cell A', spark: [3.1, 3.2, 3.3, 3.3, 3.3, 3.3] },
      ],
    },
  ];

  const currentSensor = sensorCatalog[selectedSensorIndex] || sensorCatalog[0];
  const CurrentIcon = currentSensor.icon;

  const handleCardClick = (sensor, idx) => {
    setSelectedSensorIndex(idx);
    setActiveModalSensor(sensor); // Opens deep modal inspection for every machine!
  };

  const handlePollSensors = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setToastMsg('Poll request complete! Synced all 136 transducer feeds across 20 looms.');
      setTimeout(() => setToastMsg(null), 3500);
    }, 800);
  };

  const handleCalibrateSensor = (machineId, sensorName) => {
    setToastMsg(`Transducer calibration command dispatched to ${machineId} (${sensorName})!`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredMachines = currentSensor.machineData.filter((m) => {
    const matchSearch =
      m.machineId.toLowerCase().includes(search.toLowerCase()) ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.val.toLowerCase().includes(search.toLowerCase()) ||
      (m.component || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || m.status.toLowerCase().includes(filterStatus.toLowerCase());
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', minHeight: 'calc(100vh - 120px)' }}>
      
      {/* 1. PAGE HEADER */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ color: '#0F172A', fontSize: '1.5rem', fontWeight: '900' }}>📡 Weaving Looms 18-Sensor Telemetry Portal</h1>
            <span className="badge badge-running" style={{ fontWeight: '800' }}>
              136 Active Transducer Feeds
            </span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px' }}>
            Click ANY sensor card below to inspect its detailed live readings across EVERY machine in the plant
          </p>
        </div>

        <button className="btn btn-primary" onClick={handlePollSensors} disabled={refreshing} style={{ background: '#2563EB', fontWeight: '800' }}>
          <RefreshCw size={16} className={refreshing ? 'spin' : ''} /> Poll 136 IoT Streams
        </button>
      </div>

      {toastMsg && (
        <div style={{ padding: '0.85rem 1.25rem', background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: '8px', color: '#166534', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {toastMsg}
        </div>
      )}

      {/* 2. 18-SENSOR CATEGORY CATALOG GRID */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={20} style={{ color: '#2563EB' }} /> 18 Weaving Machine IoT Sensors Catalog
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600', marginTop: '2px' }}>
              Click any sensor card to open full machine-by-machine transducer inspection
            </p>
          </div>
          <span className="badge" style={{ background: '#EFF6FF', color: '#2563EB', fontWeight: '800' }}>
            18 / 18 Transducers Active
          </span>
        </div>

        {/* 18 Sensor Selection Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {sensorCatalog.map((s, idx) => {
            const IconComp = s.icon;
            const isSelected = selectedSensorIndex === idx;

            return (
              <div
                key={s.num}
                onClick={() => handleCardClick(s, idx)}
                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  background: isSelected ? '#EFF6FF' : '#F8FAFC',
                  border: `2px solid ${isSelected ? s.color : '#E2E8F0'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(37,99,235,0.12)';
                  e.currentTarget.style.borderColor = s.color;
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }
                }}
                title={`Click to view ${s.title} readings across all machines!`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={19} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: '900', color: '#64748B', fontFamily: 'JetBrains Mono' }}>
                    #{s.num}
                  </span>
                </div>

                <div style={{ fontSize: '0.94rem', fontWeight: '900', color: isSelected ? s.color : '#0F172A' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600', marginTop: '3px', lineHeight: '1.3' }}>
                  {s.purpose}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #E2E8F0', fontSize: '0.72rem' }}>
                  <span style={{ fontWeight: '800', color: '#0F172A' }}>Range: {s.range}</span>
                  <span style={{ fontWeight: '800', color: s.color, display: 'flex', alignItems: 'center' }}>
                    Inspect {s.machineData.length} Looms <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. MULTI-MACHINE TELEMETRY MATRIX FOR SELECTED SENSOR */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem', background: '#ffffff', borderRadius: '14px', border: `2px solid ${currentSensor.color}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${currentSensor.color}15`, color: currentSensor.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CurrentIcon size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0F172A' }}>
                Multi-Machine Telemetry View: {currentSensor.title} (#{currentSensor.num})
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>
                Purpose: {currentSensor.purpose} • Transducer Hardware: {currentSensor.hardwareModel}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveModalSensor(currentSensor)} style={{ fontWeight: '800', borderColor: currentSensor.color, color: currentSensor.color }}>
              🔍 Open Full Detail Modal View
            </button>
            <div className="search-box" style={{ minWidth: '200px' }}>
              <Search size={14} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search Machine ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontSize: '0.82rem' }}
              />
            </div>
          </div>
        </div>

        {/* Multi-Machine Cards Grid for clicked sensor */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.1rem' }}>
          {filteredMachines.map((m) => (
            <div
              key={m.machineId}
              style={{
                padding: '1.1rem',
                background: '#F8FAFC',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <div>
                  <div style={{ fontSize: '0.76rem', color: '#2563EB', fontWeight: '900', fontFamily: 'JetBrains Mono' }}>
                    {m.machineId}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A', marginTop: '1px' }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>
                    📍 Location: {m.component}
                  </div>
                </div>
                <span
                  className="badge"
                  style={{
                    background: m.status === 'Critical' || m.status.includes('Risk') || m.status.includes('Alert') ? '#FEE2E2' : m.status.includes('Caution') || m.status.includes('Low') ? '#FEF3C7' : '#DCFCE7',
                    color: m.status === 'Critical' || m.status.includes('Risk') || m.status.includes('Alert') ? '#991B1B' : m.status.includes('Caution') || m.status.includes('Low') ? '#92400E' : '#166534',
                    fontWeight: '800',
                  }}
                >
                  {m.status}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '0.5rem 0', padding: '0.5rem 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '800' }}>LIVE READING</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: currentSensor.color, marginTop: '2px' }}>
                    {m.val}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>
                    Normal Range: {currentSensor.range}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '800', marginBottom: '4px' }}>SIGNAL TREND</div>
                  <Sparkline data={m.spark} color={currentSensor.color} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem' }}>
                <span style={{ color: '#64748B', fontWeight: '700' }}>10 Hz Sensor Sync</span>
                <span
                  onClick={() => navigate('/digital-twin', { state: { machineId: m.machineId } })}
                  style={{ color: '#2563EB', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  Inspect Machine <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================== */}
      {/* SENSOR-MACHINE DEEP INSPECTION MODAL */}
      {/* ==================================================== */}
      {activeModalSensor && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 2600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setActiveModalSensor(null)}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '1.75rem',
              borderRadius: '16px',
              maxWidth: '840px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              border: `2px solid ${activeModalSensor.color}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${activeModalSensor.color}15`, color: activeModalSensor.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <activeModalSensor.icon size={26} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A' }}>
                    {activeModalSensor.title} (#{activeModalSensor.num}) — All Machines Detailed Inspection
                  </h2>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>
                    Purpose: {activeModalSensor.purpose} • Transducer: {activeModalSensor.hardwareModel}
                  </div>
                </div>
              </div>
              <button onClick={() => setActiveModalSensor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={22} />
              </button>
            </div>

            {/* Sensor Specifications Strip */}
            <div style={{ padding: '1rem 1.25rem', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>HARDWARE MODEL</div>
                <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>{activeModalSensor.hardwareModel}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>OPERATING BOUNDARY</div>
                <div style={{ fontSize: '0.88rem', fontWeight: '900', color: activeModalSensor.color, marginTop: '2px' }}>{activeModalSensor.range}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>MQTT BROKER TOPIC</div>
                <div style={{ fontSize: '0.82rem', fontWeight: '900', color: '#2563EB', fontFamily: 'JetBrains Mono', marginTop: '2px' }}>{activeModalSensor.mqttTopic}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>CONNECTED LOOMS</div>
                <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#16A34A', marginTop: '2px' }}>{activeModalSensor.machineData.length} Weaving Looms</div>
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.85rem' }}>
              MACHINE-BY-MACHINE TRANSDUCTION METRICS TABLE:
            </div>

            {/* Detailed Machine-by-Machine Sensor Table */}
            <div className="table-responsive" style={{ marginBottom: '1.5rem' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Machine ID</th>
                    <th>Machine Model</th>
                    <th>Sensor Placement</th>
                    <th>Live Reading</th>
                    <th>Normal Range</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeModalSensor.machineData.map((m) => (
                    <tr key={m.machineId}>
                      <td style={{ fontFamily: 'JetBrains Mono', color: '#2563EB', fontWeight: '900' }}>{m.machineId}</td>
                      <td style={{ fontWeight: '800', color: '#0F172A' }}>{m.name}</td>
                      <td style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>📍 {m.component}</td>
                      <td style={{ fontWeight: '900', fontSize: '1.05rem', color: activeModalSensor.color }}>{m.val}</td>
                      <td style={{ fontSize: '0.8rem', color: '#64748B' }}>{activeModalSensor.range}</td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            background: m.status === 'Critical' || m.status.includes('Risk') || m.status.includes('Alert') ? '#FEE2E2' : m.status.includes('Caution') || m.status.includes('Low') ? '#FEF3C7' : '#DCFCE7',
                            color: m.status === 'Critical' || m.status.includes('Risk') || m.status.includes('Alert') ? '#991B1B' : m.status.includes('Caution') || m.status.includes('Low') ? '#92400E' : '#166534',
                            fontWeight: '800',
                          }}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => { setActiveModalSensor(null); navigate('/digital-twin', { state: { machineId: m.machineId } }); }}
                            style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', fontWeight: '800' }}
                          >
                            View Twin
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleCalibrateSensor(m.machineId, activeModalSensor.title)}
                            style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', background: '#2563EB', fontWeight: '800' }}
                          >
                            Calibrate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => setActiveModalSensor(null)} style={{ fontWeight: '800' }}>
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorMonitoringPage;
