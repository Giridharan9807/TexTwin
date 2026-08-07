import React, { useState, useEffect } from 'react';
import { digitalTwinApi, machineApi } from '../api/client';
import {
  Cpu,
  Activity,
  Zap,
  Gauge,
  Thermometer,
  Sparkles,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Wrench,
  Search,
  CheckCircle2,
  Clock,
  Radio,
  ArrowRightLeft,
  Server,
  Building,
  MapPin,
  FileText,
  Filter,
  X,
  AlertOctagon,
  Calendar,
  UserCheck,
  TrendingUp,
  ShieldAlert,
  DollarSign,
  ShieldCheck,
  Maximize2,
  Download,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DigitalTwinPage = () => {
  const navigate = useNavigate();

  // 1. CASCADING SELECTOR STATE
  const [selectedPlant, setSelectedPlant] = useState('Coimbatore');
  const [selectedMachineType, setSelectedMachineType] = useState('Air Jet Loom');
  const [selectedMachineId, setSelectedMachineId] = useState('LOOM-201');

  // Digital Twin Payload
  const [twinData, setTwinData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Selected Component Side Drawer State
  const [activeComponentDrawer, setActiveComponentDrawer] = useState(null);

  // Historical Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState('12:05 PM');

  // Available Filter Lists
  const plants = ['Coimbatore', 'Tirupur', 'Gujarat', 'Kanchipuram', 'Salem', 'Surat'];
  const machineTypes = [
    'Air Jet Loom',
    'Water Jet Loom',
    'Rapier Loom',
    'Projectile Loom',
    'Shuttle Loom',
    'Circular Knitting Machine',
  ];
  const availableMachines = [
    { id: 'LOOM-201', name: 'LOOM-201 (Dornier Air Jet HD-2025)', type: 'Air Jet Loom', plant: 'Coimbatore' },
    { id: 'LOOM-101', name: 'LOOM-101 (Toyota JAT810)', type: 'Air Jet Loom', plant: 'Coimbatore' },
    { id: 'LOOM-104', name: 'LOOM-104 (Tsudakoma ZAX)', type: 'Water Jet Loom', plant: 'Tirupur' },
    { id: 'LOOM-301', name: 'LOOM-301 (Picanol OptiMax)', type: 'Rapier Loom', plant: 'Gujarat' },
    { id: 'LOOM-501', name: 'LOOM-501 (Sulzer P7300)', type: 'Projectile Loom', plant: 'Kanchipuram' },
    { id: 'LOOM-601', name: 'LOOM-601 (Mayer Knitting)', type: 'Circular Knitting Machine', plant: 'Surat' },
  ];

  useEffect(() => {
    fetchTwinData(selectedMachineId);
  }, []);

  const handleLoadDigitalTwin = () => {
    fetchTwinData(selectedMachineId);
  };

  const fetchTwinData = async (mId) => {
    try {
      setLoading(true);
      const res = await digitalTwinApi.getByMachineId(mId);
      if (res && res.data && res.data.success) {
        setTwinData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch digital twin:', err);
    } finally {
      setLoading(false);
    }
  };

  // Master Digital Twin Data Payload
  const twin = twinData || {
    machineId: selectedMachineId,
    machineType: selectedMachineType,
    manufacturer: selectedMachineType.includes('Air') ? 'Dornier' : selectedMachineType.includes('Water') ? 'Tsudakoma' : 'Picanol',
    model: 'HD-2025',
    installed: 2024,
    plant: selectedPlant,
    department: 'High-Speed Weaving',
    operator: 'Arun Kumar',
    shift: 'Morning',
    currentStatus: 'Running',
    
    // AI Metrics
    aiPrediction: {
      healthScore: 68,
      remainingUsefulLifeHours: 34,
      failureProbability: 82,
      confidenceScore: 96,
      riskLevel: 'HIGH',
      modelName: 'XGBoost v4',
      predictionTime: '12:05 PM',
      
      // Structured Root Cause Cards
      primaryCause: 'Bearing Fatigue',
      sensorTrigger: 'Vibration Sensor',
      currentReading: '0.42 mm/s',
      threshold: '0.30 mm/s',
      recommendedAction: 'Replace Shaft Bearing',
      estimatedDowntimeMin: 45,
      estimatedRepairCostINR: 4500,
      potentialLossIgnoredINR: 65000,
    },

    // 8 Hotspot Components
    components: [
      { name: 'Motor', currentTemp: 82, normalTemp: 60, currentRpm: 1180, health: 63, remainingLifeHours: 32, lastMaint: '15 July', rec: 'Replace Motor Drive Bearing', color: '#EF4444', status: 'critical' },
      { name: 'Bearing', currentTemp: 54, normalTemp: 50, currentRpm: 1050, health: 96, remainingLifeHours: 850, lastMaint: '15 July', rec: 'Routine Lube Inspection', color: '#22C55E', status: 'normal' },
      { name: 'Main Shaft', currentTemp: 48, normalTemp: 45, currentRpm: 1050, health: 92, remainingLifeHours: 640, lastMaint: '20 May', rec: 'No Action Needed', color: '#22C55E', status: 'normal' },
      { name: 'Warp Beam', currentTemp: 38, normalTemp: 35, currentRpm: 980, health: 98, remainingLifeHours: 1200, lastMaint: '10 Apr', rec: 'Optimal Warp Tension', color: '#22C55E', status: 'normal' },
      { name: 'Weft Sensor', currentTemp: 41, normalTemp: 40, currentRpm: 1050, health: 62, remainingLifeHours: 48, lastMaint: '12 July', rec: 'Clean Optical Lens Sensor', color: '#EF4444', status: 'critical' },
      { name: 'Air Nozzle', currentTemp: 45, normalTemp: 40, currentRpm: 1050, health: 85, remainingLifeHours: 420, lastMaint: '01 July', rec: 'Flush Nozzle Scale Filter', color: '#F59E0B', status: 'warning' },
      { name: 'Compressor', currentTemp: 58, normalTemp: 55, currentRpm: 1100, health: 88, remainingLifeHours: 510, lastMaint: '18 June', rec: 'Check Air Filter Bar', color: '#22C55E', status: 'normal' },
      { name: 'Drive Belt', currentTemp: 42, normalTemp: 40, currentRpm: 1200, health: 90, remainingLifeHours: 580, lastMaint: '05 May', rec: 'Inspect Belt Tension', color: '#22C55E', status: 'normal' },
    ],

    // Sensor Table Records
    sensorTable: [
      { name: 'Temperature', current: 82, avg: 74, min: 52, max: 83, unit: '°C', status: 'Warning', statusColor: '#F59E0B' },
      { name: 'RPM', current: 1080, avg: 1052, min: 1000, max: 1120, unit: 'RPM', status: 'Normal', statusColor: '#22C55E' },
      { name: 'Vibration', current: 0.42, avg: 0.24, min: 0.12, max: 0.44, unit: 'mm/s', status: 'Critical', statusColor: '#EF4444' },
      { name: 'Pressure', current: 6.5, avg: 5.4, min: 4.5, max: 6.8, unit: 'bar', status: 'Normal', statusColor: '#22C55E' },
    ],

    // Maintenance History Card
    maintenanceCard: {
      lastServiceDate: '15 Jul 2026',
      engineer: 'Rajesh Kumar',
      workOrder: 'WO-8043',
      bearingReplaced: 'Yes',
      nextServiceDate: '15 Aug 2026',
      remainingDays: 15,
    },

    // Event Timeline
    timeline: [
      { time: '11:20', event: 'Maintenance Scheduled for LOOM-201 Drive Shaft' },
      { time: '11:16', event: 'Work Order WO-8043 Created & Dispatched' },
      { time: '11:14', event: 'Engineer Assigned: Rajesh Kumar' },
      { time: '11:12', event: 'Critical Alert Created: Vibration 0.42 mm/s' },
      { time: '11:10', event: 'AI Prediction Generated: 82% Failure Prob' },
      { time: '11:02', event: 'Temperature Increased above 80.0°C' },
    ],

    // MQTT Live Details
    mqtt: {
      broker: 'Mosquitto (Eclipse MQTT)',
      topic: `textwin/telemetry/${selectedMachineId}`,
      qos: 1,
      messagesCount: '245,324',
      lastPacket: '1 sec ago',
      latencyMs: 18,
    },
  };

  // 3D SVG Schematic Generator per Machine Type
  const renderDynamic3DModel = () => {
    switch (selectedMachineType) {
      case 'Rapier Loom':
        return (
          <svg width="340" height="190" viewBox="0 0 340 190" fill="none">
            <rect x="20" y="30" width="300" height="120" rx="10" fill="#F1F5F9" stroke="#0284C7" strokeWidth="2.5" />
            <path d="M40 90 L300 90" stroke="#0284C7" strokeWidth="4" strokeDasharray="6 6" />
            <circle cx="80" cy="90" r="28" fill="#E2E8F0" stroke="#0284C7" strokeWidth="3" />
            <text x="110" y="160" fill="#0F172A" fontSize="12" fontWeight="800">RAPIER FLEXIBLE TAPE SCHEMATIC</text>
          </svg>
        );
      case 'Water Jet Loom':
        return (
          <svg width="340" height="190" viewBox="0 0 340 190" fill="none">
            <rect x="20" y="30" width="300" height="120" rx="10" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="2.5" />
            <circle cx="170" cy="90" r="35" fill="#CFFAFE" stroke="#06B6D4" strokeWidth="3" />
            <path d="M170 55 L170 125 M135 90 L205 90" stroke="#06B6D4" strokeWidth="3" />
            <text x="100" y="160" fill="#0F172A" fontSize="12" fontWeight="800">HIGH-PRESSURE WATER JET NOZZLE</text>
          </svg>
        );
      case 'Circular Knitting Machine':
        return (
          <svg width="340" height="190" viewBox="0 0 340 190" fill="none">
            <circle cx="170" cy="90" r="55" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="3" />
            <circle cx="170" cy="90" r="35" fill="#ffffff" stroke="#8B5CF6" strokeWidth="2" />
            <text x="105" y="165" fill="#0F172A" fontSize="12" fontWeight="800">CIRCULAR NEEDLE CYLINDER</text>
          </svg>
        );
      case 'Air Jet Loom':
      default:
        return (
          <svg width="340" height="190" viewBox="0 0 340 190" fill="none">
            <rect x="20" y="30" width="300" height="120" rx="10" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.5" />
            <rect x="50" y="60" width="80" height="60" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
            <circle cx="230" cy="90" r="32" fill="#DBEAFE" stroke="#2563EB" strokeWidth="3" />
            <text x="105" y="160" fill="#0F172A" fontSize="12" fontWeight="800">AIR JET MAIN NOZZLE & COMPRESSOR</text>
          </svg>
        );
    }
  };

  // Sensor Chart Configurations with Gradient & Threshold Lines
  const tempChartData = {
    labels: ['08:00', '09:00', '10:00', '11:00', '12:00'],
    datasets: [
      {
        label: 'Motor Temperature (°C)',
        data: [52, 64, 72, 82, 80],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Threshold (75°C)',
        data: [75, 75, 75, 75, 75],
        borderColor: '#F59E0B',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const rpmChartData = {
    labels: ['08:00', '09:00', '10:00', '11:00', '12:00'],
    datasets: [
      {
        label: 'Current Speed (RPM)',
        data: [1020, 1050, 1080, 1180, 1150],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Target Speed (1050 RPM)',
        data: [1050, 1050, 1050, 1050, 1050],
        borderColor: '#10B981',
        borderDash: [4, 4],
        pointRadius: 0,
      },
    ],
  };

  const vibChartData = {
    labels: ['08:00', '09:00', '10:00', '11:00', '12:00'],
    datasets: [
      {
        label: 'Shaft Vibration Area (mm/s)',
        data: [0.12, 0.19, 0.28, 0.42, 0.38],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Normal Boundary (0.30 mm/s)',
        data: [0.3, 0.3, 0.3, 0.3, 0.3],
        borderColor: '#EF4444',
        borderDash: [4, 4],
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { family: 'Plus Jakarta Sans', size: 10, weight: '700' } } },
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* 1. TOP CASCADING SELECTOR BAR */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem 1.5rem',
          background: '#ffffff',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', flex: 1 }}>
          <div className="form-group" style={{ marginBottom: 0, minWidth: '180px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569' }}>Plant</label>
            <select className="form-control" value={selectedPlant} onChange={(e) => setSelectedPlant(e.target.value)} style={{ fontWeight: '700', borderColor: '#2563EB' }}>
              {plants.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0, minWidth: '180px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569' }}>Machine Type</label>
            <select className="form-control" value={selectedMachineType} onChange={(e) => setSelectedMachineType(e.target.value)} style={{ fontWeight: '700', borderColor: '#2563EB' }}>
              {machineTypes.map((mt) => (
                <option key={mt} value={mt}>{mt}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0, minWidth: '180px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569' }}>Machine</label>
            <select className="form-control" value={selectedMachineId} onChange={(e) => setSelectedMachineId(e.target.value)} style={{ fontWeight: '800', borderColor: '#2563EB', fontFamily: 'JetBrains Mono, monospace' }}>
              {availableMachines.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleLoadDigitalTwin} style={{ background: '#2563EB', padding: '0.75rem 1.75rem', fontWeight: '800' }}>
          🚀 Load Digital Twin
        </button>
      </div>

      {/* 2. MACHINE INFORMATION BAR */}
      <div
        className="glass-card"
        style={{
          padding: '1.1rem 1.5rem',
          background: '#ffffff',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.85rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>MACHINE ID</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2563EB', fontFamily: 'JetBrains Mono' }}>{twin.machineId}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>MACHINE TYPE</div>
          <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>{twin.machineType}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>MANUFACTURER</div>
          <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>{twin.manufacturer}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>MODEL</div>
          <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>{twin.model}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>INSTALLED</div>
          <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>{twin.installed}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>PLANT / DEPT</div>
          <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>{twin.plant} • {twin.department}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>OPERATOR / SHIFT</div>
          <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>{twin.operator} ({twin.shift})</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>CURRENT STATUS</div>
          <span className="badge" style={{ background: '#DCFCE7', color: '#166534', fontWeight: '800' }}>🟢 {twin.currentStatus}</span>
        </div>
      </div>

      {/* 3. CENTER SECTION: 3D DIGITAL TWIN + LIVE SENSOR KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
        
        {/* 3D Digital Twin Card */}
        <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} style={{ color: '#2563EB' }} /> 3D Digital Twin Interactive Model ({selectedMachineType})
            </h3>
            <span className="badge" style={{ background: '#EFF6FF', color: '#2563EB', fontWeight: '800' }}>8 Component Hotspots</span>
          </div>

          <div
            style={{
              height: '240px',
              background: '#F8FAFC',
              border: '1.5px dashed #CBD5E1',
              borderRadius: '10px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              overflow: 'hidden',
            }}
          >
            {renderDynamic3DModel()}

            {/* Hotspots */}
            {twin.components.map((c, idx) => {
              const positions = [
                { top: '25%', left: '75%' }, // Motor
                { top: '35%', left: '25%' }, // Bearing
                { top: '50%', left: '50%' }, // Main Shaft
                { top: '70%', left: '20%' }, // Warp Beam
                { top: '45%', left: '85%' }, // Weft Sensor
                { top: '65%', left: '60%' }, // Air Nozzle
                { top: '80%', left: '70%' }, // Compressor
                { top: '30%', left: '40%' }, // Drive Belt
              ];
              const pos = positions[idx % positions.length];

              return (
                <div
                  key={c.name}
                  onClick={() => setActiveComponentDrawer(c)}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: '#ffffff',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '20px',
                    border: `1.5px solid ${c.color}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color, boxShadow: `0 0 6px ${c.color}` }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0F172A' }}>{c.name} {c.status === 'critical' ? '🔴' : c.status === 'warning' ? '🟡' : '🟢'}</span>
                </div>
              );
            })}
          </div>

          {/* Interactive Component Side Drawer / Modal */}
          {activeComponentDrawer && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#F5F3FF', border: '1.5px solid #8B5CF6', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#8B5CF6' }}>🔍 Component Hotspot: {activeComponentDrawer.name}</span>
                <button onClick={() => setActiveComponentDrawer(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.82rem', color: '#0F172A', fontWeight: '700' }}>
                <div>Temperature: <strong style={{ color: activeComponentDrawer.currentTemp > 75 ? '#EF4444' : '#22C55E' }}>{activeComponentDrawer.currentTemp}°C</strong> (Normal: {activeComponentDrawer.normalTemp}°C)</div>
                <div>Current RPM: <strong>{activeComponentDrawer.currentRpm} RPM</strong></div>
                <div>Component Health: <strong style={{ color: activeComponentDrawer.color }}>{activeComponentDrawer.health}</strong></div>
                <div>Remaining Life: <strong>{activeComponentDrawer.remainingLifeHours} Hours</strong></div>
                <div>Last Maintenance: <strong>{activeComponentDrawer.lastMaint}</strong></div>
                <div>Action: <strong style={{ color: '#EF4444' }}>{activeComponentDrawer.rec}</strong></div>
              </div>
            </div>
          )}
        </div>

        {/* Live Sensor KPI Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', background: '#FEF2F2', borderRadius: '12px', border: '1px solid #EF4444' }}>
            <div style={{ fontSize: '0.78rem', color: '#991B1B', fontWeight: '800' }}>TEMPERATURE</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#EF4444', marginTop: '4px' }}>82°C</div>
            <div style={{ fontSize: '0.75rem', color: '#991B1B', marginTop: '4px', fontWeight: '700' }}>Threshold: 75°C (Overheat)</div>
          </div>

          <div style={{ padding: '1.25rem', background: '#EFF6FF', borderRadius: '12px', border: '1px solid #2563EB' }}>
            <div style={{ fontSize: '0.78rem', color: '#1E3A8A', fontWeight: '800' }}>SPEED (RPM)</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2563EB', marginTop: '4px' }}>1,080 <span style={{ fontSize: '0.9rem' }}>RPM</span></div>
            <div style={{ fontSize: '0.75rem', color: '#1E3A8A', marginTop: '4px', fontWeight: '700' }}>Target: 1,050 RPM</div>
          </div>

          <div style={{ padding: '1.25rem', background: '#F5F3FF', borderRadius: '12px', border: '1px solid #8B5CF6' }}>
            <div style={{ fontSize: '0.78rem', color: '#5B21B6', fontWeight: '800' }}>VIBRATION</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#8B5CF6', marginTop: '4px' }}>0.42 <span style={{ fontSize: '0.9rem' }}>mm/s</span></div>
            <div style={{ fontSize: '0.75rem', color: '#5B21B6', marginTop: '4px', fontWeight: '700' }}>Threshold: 0.30 mm/s</div>
          </div>

          <div style={{ padding: '1.25rem', background: '#ECFEFF', borderRadius: '12px', border: '1px solid #06B6D4' }}>
            <div style={{ fontSize: '0.78rem', color: '#155E75', fontWeight: '800' }}>AIR PRESSURE</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#06B6D4', marginTop: '4px' }}>6.5 <span style={{ fontSize: '0.9rem' }}>bar</span></div>
            <div style={{ fontSize: '0.75rem', color: '#155E75', marginTop: '4px', fontWeight: '700' }}>Normal: 4.5–6.8 bar</div>
          </div>
        </div>
      </div>

      {/* 4. AI PREDICTION & STRUCTURED ROOT CAUSE CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        
        {/* Machine Health Card */}
        <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} style={{ color: '#8B5CF6' }} /> AI Machine Health & RUL
            </h3>
            <span className="badge" style={{ background: '#FEE2E2', color: '#991B1B', fontWeight: '800' }}>RISK: HIGH</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>MACHINE HEALTH</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#EF4444' }}>{twin.aiPrediction.healthScore}%</div>
            </div>
            <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>REMAINING RUL</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#F59E0B' }}>{twin.aiPrediction.remainingUsefulLifeHours} Hours</div>
            </div>
            <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>FAILURE PROBABILITY</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#EF4444' }}>{twin.aiPrediction.failureProbability}%</div>
            </div>
            <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>CONFIDENCE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#2563EB' }}>{twin.aiPrediction.confidenceScore}%</div>
            </div>
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '700' }}>
            Model: {twin.aiPrediction.modelName} • Last Evaluated: {twin.aiPrediction.predictionTime}
          </div>
        </div>

        {/* Structured AI Root Cause Cards */}
        <div className="glass-card" style={{ padding: '1.5rem', background: '#FEE2E2', border: '1.5px solid #EF4444', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <AlertOctagon size={18} /> STRUCTURED AI ROOT CAUSE CARDS
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.82rem', color: '#0F172A', fontWeight: '700' }}>
            <div style={{ padding: '0.65rem', background: '#ffffff', borderRadius: '6px' }}>
              <div style={{ color: '#991B1B', fontSize: '0.7rem' }}>PRIMARY CAUSE</div>
              <div style={{ fontWeight: '900', color: '#EF4444' }}>{twin.aiPrediction.primaryCause}</div>
            </div>
            <div style={{ padding: '0.65rem', background: '#ffffff', borderRadius: '6px' }}>
              <div style={{ color: '#991B1B', fontSize: '0.7rem' }}>SENSOR TRIGGER</div>
              <div style={{ fontWeight: '900' }}>{twin.aiPrediction.sensorTrigger}</div>
            </div>
            <div style={{ padding: '0.65rem', background: '#ffffff', borderRadius: '6px' }}>
              <div style={{ color: '#991B1B', fontSize: '0.7rem' }}>CURRENT READING</div>
              <div style={{ fontWeight: '900', color: '#EF4444' }}>{twin.aiPrediction.currentReading}</div>
            </div>
            <div style={{ padding: '0.65rem', background: '#ffffff', borderRadius: '6px' }}>
              <div style={{ color: '#991B1B', fontSize: '0.7rem' }}>THRESHOLD LIMIT</div>
              <div style={{ fontWeight: '900' }}>{twin.aiPrediction.threshold}</div>
            </div>
            <div style={{ padding: '0.65rem', background: '#ffffff', borderRadius: '6px' }}>
              <div style={{ color: '#991B1B', fontSize: '0.7rem' }}>ESTIMATED DOWNTIME</div>
              <div style={{ fontWeight: '900' }}>{twin.aiPrediction.estimatedDowntimeMin} min</div>
            </div>
            <div style={{ padding: '0.65rem', background: '#ffffff', borderRadius: '6px' }}>
              <div style={{ color: '#991B1B', fontSize: '0.7rem' }}>ESTIMATED REPAIR COST</div>
              <div style={{ fontWeight: '900', color: '#2563EB' }}>₹{twin.aiPrediction.estimatedRepairCostINR.toLocaleString()}</div>
            </div>
          </div>

          <div style={{ marginTop: '0.85rem', padding: '0.65rem', background: '#ffffff', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '800', color: '#991B1B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Potential Loss if Ignored: ₹{twin.aiPrediction.potentialLossIgnoredINR.toLocaleString()}</span>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/maintenance')} style={{ background: '#EF4444', borderColor: '#EF4444' }}>
              <Wrench size={14} /> Dispatch Repair
            </button>
          </div>
        </div>
      </div>

      {/* 5. INDIVIDUAL SENSOR HISTORY CHARTS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>Temperature Trend (°C)</h4>
          <div style={{ height: '140px', width: '100%' }}>
            <Line data={tempChartData} options={chartOptions} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>RPM Speed Trend</h4>
          <div style={{ height: '140px', width: '100%' }}>
            <Line data={rpmChartData} options={chartOptions} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>Vibration Area Chart (mm/s)</h4>
          <div style={{ height: '140px', width: '100%' }}>
            <Line data={vibChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* 6. COMPREHENSIVE SENSOR STATISTICS TABLE */}
      <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} style={{ color: '#2563EB' }} /> Comprehensive Telemetry Sensor Statistics Table
        </h3>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Sensor Parameter</th>
                <th>Current Reading</th>
                <th>Average</th>
                <th>Min</th>
                <th>Max</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {twin.sensorTable.map((row) => (
                <tr key={row.name}>
                  <td style={{ fontWeight: '800' }}>{row.name}</td>
                  <td style={{ fontWeight: '900', fontSize: '1rem' }}>{row.current} {row.unit}</td>
                  <td>{row.avg} {row.unit}</td>
                  <td>{row.min} {row.unit}</td>
                  <td>{row.max} {row.unit}</td>
                  <td>
                    <span className="badge" style={{ background: `${row.statusColor}20`, color: row.statusColor, border: `1px solid ${row.statusColor}`, fontWeight: '800' }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7 & 8. MAINTENANCE CARD, EVENT TIMELINE & MQTT LIVE STATUS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        
        {/* Maintenance Card */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Wrench size={16} style={{ color: '#F97316' }} /> Maintenance History (MySQL Record)
          </h3>
          <div style={{ fontSize: '0.82rem', color: '#0F172A', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: '700' }}>
            <div>Last Service: <strong>{twin.maintenanceCard.lastServiceDate}</strong></div>
            <div>Engineer: <strong>{twin.maintenanceCard.engineer}</strong></div>
            <div>Work Order: <strong style={{ color: '#2563EB', fontFamily: 'JetBrains Mono' }}>{twin.maintenanceCard.workOrder}</strong></div>
            <div>Bearing Replaced: <strong style={{ color: '#22C55E' }}>{twin.maintenanceCard.bearingReplaced}</strong></div>
            <div>Next Scheduled Service: <strong>{twin.maintenanceCard.nextServiceDate}</strong></div>
            <div>Remaining Time: <strong style={{ color: '#F59E0B' }}>{twin.maintenanceCard.remainingDays} Days</strong></div>
          </div>
        </div>

        {/* Event Timeline */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} style={{ color: '#2563EB' }} /> Digital Twin Event Timeline
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {twin.timeline.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono', color: '#2563EB', fontWeight: '800', minWidth: '45px' }}>{item.time}</span>
                <span style={{ color: '#0F172A', fontWeight: '700' }}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MQTT Status Bar */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Radio size={16} style={{ color: '#06B6D4' }} /> MQTT Telemetry Status Bar
          </h3>
          <div style={{ fontSize: '0.8rem', color: '#0F172A', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontWeight: '700' }}>
            <div>Broker: <strong>{twin.mqtt.broker}</strong></div>
            <div>Topic: <strong style={{ color: '#2563EB', fontFamily: 'JetBrains Mono' }}>{twin.mqtt.topic}</strong></div>
            <div>QoS: <strong>{twin.mqtt.qos}</strong></div>
            <div>Messages Streamed: <strong>{twin.mqtt.messagesCount}</strong></div>
            <div>Last Packet: <strong>{twin.mqtt.lastPacket}</strong></div>
            <div>Network Latency: <strong style={{ color: '#22C55E' }}>{twin.mqtt.latencyMs} ms</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinPage;
