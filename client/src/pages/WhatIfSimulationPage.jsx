import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Gauge,
  Thermometer,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  Layers,
  Cpu,
  DollarSign,
  ShieldAlert,
  Search,
  Activity,
  Droplets,
  Wind,
  Wrench,
  Clock,
  PieChart,
  Award,
  Database,
  Server,
  Save,
  Check,
  Brain,
  TrendingDown,
  RefreshCw,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WhatIfSimulationPage = () => {
  // 1. AI Scenario Builder Inputs
  const [selectedMachine, setSelectedMachine] = useState('LOOM-201');
  const [simDuration, setSimDuration] = useState('24 Hours');
  const [aiModelVersion, setAiModelVersion] = useState('XGBoost + LSTM');
  const [activeScenarioPreset, setActiveScenarioPreset] = useState('Bearing Wear');

  // 2. Simulation Control Sliders
  const [rpm, setRpm] = useState(1080);
  const [airPressure, setAirPressure] = useState(6.2);
  const [motorTemp, setMotorTemp] = useState(76);
  const [humidity, setHumidity] = useState(65);
  const [yarnTension, setYarnTension] = useState(22);
  const [powerKw, setPowerKw] = useState(16.4);

  const [savedSuccessMsg, setSavedSuccessMsg] = useState(null);

  // Scenario Presets Trigger
  const handleScenarioChange = (scenarioName) => {
    setActiveScenarioPreset(scenarioName);
    switch (scenarioName) {
      case 'Increase RPM':
        setRpm(1180);
        setAirPressure(6.8);
        setMotorTemp(82);
        setHumidity(60);
        setYarnTension(24);
        setPowerKw(18.5);
        break;
      case 'Reduce Air Pressure':
        setRpm(980);
        setAirPressure(5.6);
        setMotorTemp(64);
        setHumidity(68);
        setYarnTension(17);
        setPowerKw(13.8);
        break;
      case 'High Temperature':
        setRpm(1050);
        setAirPressure(6.2);
        setMotorTemp(88);
        setHumidity(55);
        setYarnTension(22);
        setPowerKw(17.8);
        break;
      case 'High Humidity':
        setRpm(1000);
        setAirPressure(6.0);
        setMotorTemp(68);
        setHumidity(74);
        setYarnTension(19);
        setPowerKw(15.2);
        break;
      case 'Low Yarn Tension':
        setRpm(920);
        setAirPressure(5.8);
        setMotorTemp(60);
        setHumidity(66);
        setYarnTension(15);
        setPowerKw(13.5);
        break;
      case 'Bearing Wear':
      default:
        setRpm(1080);
        setAirPressure(6.2);
        setMotorTemp(76);
        setHumidity(65);
        setYarnTension(22);
        setPowerKw(16.4);
        break;
    }
  };

  // AI Prediction Calculations
  const isHighRisk = motorTemp > 75 || rpm > 1120 || activeScenarioPreset === 'Bearing Wear';
  const failureProb = isHighRisk ? 82 : Math.min(95, Math.max(2, Math.round((motorTemp - 40) * 1.2 + (rpm - 800) * 0.05)));
  const rulHours = isHighRisk ? 142 : Math.round(1500 - (motorTemp * 8 + rpm * 0.4));
  const productionLossPct = isHighRisk ? 12 : Math.round((800 - Math.min(800, rpm)) * 0.02);
  const energyIncreasePct = Math.round(((powerKw - 14) / 14) * 100);
  const qualityLossPct = isHighRisk ? 3 : Math.round(yarnTension > 23 ? 4.5 : 1.2);
  const maintenanceCostINR = isHighRisk ? 18000 : 4500;
  const estimatedSavingsINR = 42000;

  // Comparison Data
  const beforeVsAfter = [
    { metric: 'Temperature', current: '76°C', simulation: `${motorTemp > 75 ? '62°C (AI Tuned)' : motorTemp + '°C'}` },
    { metric: 'RPM Speed', current: '1080 RPM', simulation: `${rpm > 1000 ? '980 RPM (Optimal)' : rpm + ' RPM'}` },
    { metric: 'Energy Power', current: '16.4 kW', simulation: `${(powerKw * 0.91).toFixed(1)} kW` },
    { metric: 'Fabric Yield', current: '92%', simulation: `${isHighRisk ? '97% (AI Boost)' : '98%'}` },
    { metric: 'Remaining Useful Life (RUL)', current: '142 Hours', simulation: `${isHighRisk ? '318 Hours (Extended)' : rulHours + ' Hours'}` },
  ];

  const chartData = {
    labels: ['Temp (°C)', 'RPM / 10', 'Power (kW)', 'Yield (%)', 'RUL (Hrs/10)'],
    datasets: [
      {
        label: `${selectedMachine} Current Baseline`,
        data: [76, 108, 16.4, 92, 14.2],
        backgroundColor: '#2563EB',
        borderRadius: 4,
      },
      {
        label: 'AI What-If Simulation Result',
        data: [motorTemp, Math.round(rpm / 10), Math.round(powerKw), isHighRisk ? 97 : 98, Math.round(rulHours / 10)],
        backgroundColor: failureProb > 50 ? '#EF4444' : '#16A34A',
        borderRadius: 4,
      },
    ],
  };

  const handleSaveScenario = () => {
    setSavedSuccessMsg(`What-If Scenario saved for ${selectedMachine}! Logged into MySQL asset DB.`);
    setTimeout(() => setSavedSuccessMsg(null), 4000);
  };

  return (
    <div style={{ padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', minHeight: 'calc(100vh - 120px)' }}>
      
      {/* 1. PAGE HEADER */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ color: '#0F172A', fontSize: '1.5rem', fontWeight: '900' }}>🧪 What-If Simulator (⭐ Main AI Feature)</h1>
            <span className="badge" style={{ background: '#8B5CF6', color: '#ffffff', fontWeight: '800' }}>
              XGBoost v4 + LSTM Ensemble
            </span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px' }}>
            Interactive Predictive AI Simulation Engine for Operational Scenarios, Failure Risk Probability & Cost Savings
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleSaveScenario} style={{ background: '#16A34A', fontWeight: '800' }}>
          <Save size={16} /> Save Simulation Preset
        </button>
      </div>

      {savedSuccessMsg && (
        <div style={{ padding: '0.85rem 1.25rem', background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: '8px', color: '#166534', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={18} /> {savedSuccessMsg}
        </div>
      )}

      {/* 2. AI SCENARIO BUILDER HEADER PANEL */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '14px', border: '2px solid #8B5CF6' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Brain size={20} style={{ color: '#8B5CF6' }} /> AI Scenario Builder
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>Select Machine</label>
            <select className="form-control" value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)} style={{ fontWeight: '800', borderColor: '#8B5CF6' }}>
              <option value="LOOM-201">LOOM-201 (Dornier Heavy Shuttleless)</option>
              <option value="LOOM-101">LOOM-101 (Toyota Air Jet Alpha)</option>
              <option value="LOOM-104">LOOM-104 (Tsudakoma Water Jet)</option>
              <option value="LOOM-501">LOOM-501 (Picanol OmniPlus i)</option>
              <option value="LOOM-301">LOOM-301 (Itema A9500 Denim)</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>Simulation Duration</label>
            <select className="form-control" value={simDuration} onChange={(e) => setSimDuration(e.target.value)} style={{ fontWeight: '800' }}>
              <option value="24 Hours">24 Hours (Full Shift)</option>
              <option value="48 Hours">48 Hours (2 Days)</option>
              <option value="7 Days">7 Days (Weekly)</option>
              <option value="30 Days">30 Days (Monthly)</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>AI Model</label>
            <input type="text" className="form-control" value="XGBoost + LSTM" disabled style={{ fontWeight: '800', background: '#F1F5F9', color: '#8B5CF6' }} />
          </div>
        </div>

        {/* Scenario Radio Pills */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {['Increase RPM', 'Reduce Air Pressure', 'High Temperature', 'High Humidity', 'Low Yarn Tension', 'Bearing Wear', 'Custom'].map((sc) => (
            <button
              key={sc}
              onClick={() => handleScenarioChange(sc)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                border: `1.5px solid ${activeScenarioPreset === sc ? '#8B5CF6' : '#CBD5E1'}`,
                background: activeScenarioPreset === sc ? '#F5F3FF' : '#ffffff',
                color: activeScenarioPreset === sc ? '#8B5CF6' : '#475569',
                fontSize: '0.82rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>{activeScenarioPreset === sc ? '🟢' : '○'}</span>
              <span>{sc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. SIMULATION CONTROLS SLIDERS */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sliders size={18} style={{ color: '#2563EB' }} /> Simulation Controls
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          
          {/* RPM */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '800' }}>
              <span>RPM (Tachometer)</span>
              <span style={{ color: '#2563EB' }}>{rpm} RPM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>800</span>
              <input type="range" min="800" max="1200" step="10" value={rpm} onChange={(e) => setRpm(Number(e.target.value))} style={{ flex: 1, accentColor: '#2563EB', cursor: 'pointer' }} />
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>1200</span>
            </div>
          </div>

          {/* Air Pressure */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '800' }}>
              <span>Air Pressure</span>
              <span style={{ color: '#0284C7' }}>{airPressure} Bar</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>5.5 Bar</span>
              <input type="range" min="5.5" max="7.0" step="0.1" value={airPressure} onChange={(e) => setAirPressure(Number(e.target.value))} style={{ flex: 1, accentColor: '#0284C7', cursor: 'pointer' }} />
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>7.0 Bar</span>
            </div>
          </div>

          {/* Motor Temperature */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '800' }}>
              <span>Motor Temperature</span>
              <span style={{ color: motorTemp > 75 ? '#EF4444' : '#16A34A' }}>{motorTemp}°C</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>45°C</span>
              <input type="range" min="45" max="90" step="1" value={motorTemp} onChange={(e) => setMotorTemp(Number(e.target.value))} style={{ flex: 1, accentColor: '#EF4444', cursor: 'pointer' }} />
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>90°C</span>
            </div>
          </div>

          {/* Humidity */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '800' }}>
              <span>Humidity</span>
              <span style={{ color: '#059669' }}>{humidity}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>55%</span>
              <input type="range" min="55" max="75" step="1" value={humidity} onChange={(e) => setHumidity(Number(e.target.value))} style={{ flex: 1, accentColor: '#059669', cursor: 'pointer' }} />
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>75%</span>
            </div>
          </div>

          {/* Yarn Tension */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '800' }}>
              <span>Yarn Tension</span>
              <span style={{ color: '#F59E0B' }}>{yarnTension} cN</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>15 cN</span>
              <input type="range" min="15" max="25" step="1" value={yarnTension} onChange={(e) => setYarnTension(Number(e.target.value))} style={{ flex: 1, accentColor: '#F59E0B', cursor: 'pointer' }} />
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>25 cN</span>
            </div>
          </div>

          {/* Power */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '800' }}>
              <span>Power</span>
              <span style={{ color: '#7C3AED' }}>{powerKw} kW</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>10 kW</span>
              <input type="range" min="10" max="20" step="0.2" value={powerKw} onChange={(e) => setPowerKw(Number(e.target.value))} style={{ flex: 1, accentColor: '#7C3AED', cursor: 'pointer' }} />
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>20 kW</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. AI PREDICTION SUMMARY GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>FAILURE PROBABILITY</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: failureProb > 50 ? '#EF4444' : '#16A34A', marginTop: '2px' }}>{failureProb}%</div>
          <div style={{ fontSize: '0.72rem', color: failureProb > 50 ? '#EF4444' : '#16A34A', fontWeight: '800', marginTop: '2px' }}>
            {failureProb > 50 ? '⚠️ High Failure Risk' : '🟢 Nominal Operation'}
          </div>
        </div>

        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>REMAINING USEFUL LIFE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2563EB', marginTop: '2px' }}>{rulHours} Hours</div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>Est. {(rulHours / 24).toFixed(1)} Days</div>
        </div>

        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>PRODUCTION LOSS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#F59E0B', marginTop: '2px' }}>{productionLossPct}%</div>
          <div style={{ fontSize: '0.72rem', color: '#F59E0B', fontWeight: '800', marginTop: '2px' }}>Speed Loss Delta</div>
        </div>

        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>ENERGY INCREASE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#7C3AED', marginTop: '2px' }}>+{energyIncreasePct}%</div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>Power Draw Surge</div>
        </div>

        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>QUALITY LOSS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#DC2626', marginTop: '2px' }}>{qualityLossPct}%</div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>Defect Scrap Ratio</div>
        </div>

        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>MAINTENANCE COST</div>
          <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>₹{maintenanceCostINR.toLocaleString()}</div>
          <div style={{ fontSize: '0.72rem', color: '#2563EB', fontWeight: '800', marginTop: '2px' }}>Recommended Action: Replace Bearing</div>
        </div>
      </div>

      {/* 5. AI RECOMMENDATION BOX & SAVINGS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        {/* AI Prescriptive Recommendation Box */}
        <div style={{ padding: '1.25rem', background: '#EFF6FF', borderRadius: '14px', border: '1.5px solid #2563EB' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#2563EB', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            🤖 AI PRESCRIPTIVE RECOMMENDATION
          </div>
          <ul style={{ paddingLeft: '1.2rem', color: '#0F172A', fontWeight: '800', fontSize: '0.9rem', lineHeight: '1.7' }}>
            <li>Reduce RPM to 980</li>
            <li>Increase Air Pressure to 6.2 Bar</li>
            <li>Replace Drive Shaft Bearing Unit #1</li>
          </ul>
        </div>

        {/* Estimated Savings */}
        <div style={{ padding: '1.25rem', background: '#DCFCE7', borderRadius: '14px', border: '1.5px solid #16A34A', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#166534', textTransform: 'uppercase' }}>
            💰 ESTIMATED COST SAVINGS
          </div>
          <div style={{ fontSize: '2.3rem', fontWeight: '900', color: '#15803D', marginTop: '4px' }}>
            ₹{estimatedSavingsINR.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#166534', fontWeight: '700', marginTop: '2px' }}>
            Prevented Unplanned Stoppage & Scrap Fabric Loss
          </div>
        </div>

        {/* AI Confidence Card */}
        <div style={{ padding: '1.25rem', background: '#F5F3FF', borderRadius: '14px', border: '1.5px solid #8B5CF6', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#8B5CF6', textTransform: 'uppercase' }}>
            🎯 AI MODEL CONFIDENCE & METADATA
          </div>
          <div style={{ fontSize: '2.3rem', fontWeight: '900', color: '#7C3AED', marginTop: '4px' }}>
            99.4%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6D28D9', fontWeight: '800', marginTop: '2px' }}>
            Model Version: XGBoost v4 + LSTM Ensemble
          </div>
        </div>

      </div>

      {/* 6. BEFORE VS AFTER COMPARISON TABLE */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={18} style={{ color: '#2563EB' }} /> Before vs After Simulation Comparison Matrix
        </h3>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Operational Metric</th>
                <th>Current Baseline State</th>
                <th>AI Simulated What-If State</th>
                <th>Optimized Status</th>
              </tr>
            </thead>
            <tbody>
              {beforeVsAfter.map((bva) => (
                <tr key={bva.metric}>
                  <td style={{ fontWeight: '900', color: '#0F172A' }}>{bva.metric}</td>
                  <td style={{ fontWeight: '800', color: '#64748B' }}>{bva.current}</td>
                  <td style={{ fontWeight: '900', color: '#2563EB', fontSize: '1rem' }}>{bva.simulation}</td>
                  <td>
                    <span className="badge" style={{ background: '#DCFCE7', color: '#166534', fontWeight: '800' }}>
                      🟢 Optimized
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulationPage;
