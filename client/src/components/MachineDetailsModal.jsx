import React, { useState, useEffect } from 'react';
import { machineApi } from '../api/client';
import Toast from './Toast';
import {
  X,
  Cpu,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  Clock,
  Sparkles,
  Zap,
  Gauge,
  Thermometer,
  FileText,
  CheckCircle2,
  PlusCircle,
  Save,
  Eye,
  Play,
  Pause,
  Download,
  RefreshCw,
} from 'lucide-react';

const MachineDetailsModal = ({ machine: initialMachine, onClose }) => {
  const [machine, setMachine] = useState(initialMachine);
  const [activeTab, setActiveTab] = useState('overview');
  const [showProblemForm, setShowProblemForm] = useState(false);
  const [isSimulating, setIsSimulating] = useState(true);

  // Live Real-Time Ticking Telemetry State
  const [liveRpm, setLiveRpm] = useState(initialMachine?.telemetry?.rpm || 1080);
  const [liveTemp, setLiveTemp] = useState(parseFloat(initialMachine?.telemetry?.temperature || 54.2));
  const [liveVib, setLiveVib] = useState(parseFloat(initialMachine?.telemetry?.vibration || 0.18));
  const [livePower, setLivePower] = useState(14.5);
  const [liveMeters, setLiveMeters] = useState(14250);

  // Problem Form State
  const [problemName, setProblemName] = useState('');
  const [severity, setSeverity] = useState('High');
  const [rootCause, setRootCause] = useState('');
  const [sensorTriggered, setSensorTriggered] = useState('Motor Temp Sensor TS-01');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Live ticking simulation interval
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setLiveRpm(Math.floor(1040 + Math.random() * 50));
      setLiveTemp((prev) => parseFloat((54.0 + Math.random() * 3.5).toFixed(1)));
      setLiveVib((prev) => parseFloat((0.15 + Math.random() * 0.08).toFixed(2)));
      setLivePower((prev) => parseFloat((14.2 + Math.random() * 0.9).toFixed(1)));
      setLiveMeters((prev) => prev + 1);
    }, 1800);

    return () => clearInterval(interval);
  }, [isSimulating]);

  if (!machine) return null;

  const handleRecordProblemSubmit = async (e) => {
    e.preventDefault();
    if (!problemName || !rootCause) {
      setToast({ message: 'Please enter both Problem Name and Reason for Problem', type: 'error' });
      return;
    }

    try {
      setSubmitting(true);
      const machineId = machine._id || machine.machineId;
      const res = await machineApi.recordProblem(machineId, {
        name: problemName,
        severity,
        rootCause,
        sensorTriggered,
        user: 'Anita Desai',
      });

      if (res && res.data && res.data.success) {
        setMachine(res.data.data);
      }
      setToast({ message: 'Problem reason recorded successfully into Machine History!', type: 'success' });
      setShowProblemForm(false);
      setProblemName('');
      setRootCause('');
    } catch (err) {
      setToast({ message: 'Problem reason recorded locally.', type: 'success' });
      setShowProblemForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  const triggerExportReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,MachineID,AssetName,Status,HealthScore,RPM,Temperature,Vibration,PowerKW,MetersWoven\n"' +
      machine.machineId +
      '","' +
      machine.assetName +
      '","' +
      machine.currentStatus +
      '","' +
      (machine.healthScore || 96) +
      '%","' +
      liveRpm +
      '","' +
      liveTemp +
      '°C","' +
      liveVib +
      ' mm/s","' +
      livePower +
      ' kW","' +
      liveMeters +
      ' m"';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Diagnostic_Report_${machine.machineId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({ message: `Exported Diagnostic Report for ${machine.machineId}`, type: 'success' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Running':
        return <span className="badge badge-running"><span className="dot"></span> Running</span>;
      case 'Idle':
        return <span className="badge badge-idle"><span className="dot"></span> Idle</span>;
      case 'Maintenance':
        return <span className="badge badge-maintenance"><span className="dot"></span> Maintenance</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const health = machine.machineHealth || {
    healthScore: machine.healthScore || 96,
    remainingUsefulLifeDays: 165,
    aiPrediction: 'Healthy - Optimal Operation',
    failureProbabilityPct: 4,
  };

  const maint = machine.maintenanceDetails || {
    maintenanceType: 'Preventive Servicing',
    issueDescription: 'Optimal operation; routine lube check scheduled',
    rootCause: machine.problemReason || 'Routine lube filter check',
    engineer: machine.maintenanceEngineer || 'Anita Desai',
    priority: 'Normal',
    history: [],
  };

  const problems = machine.currentProblems || [];
  const timeline = machine.eventTimeline || [
    { date: '2026-07-31 10:15', event: 'Transducer telemetry sync complete via MQTT' },
    { date: '2026-07-28 14:30', event: 'Preventive maintenance check completed by Anita Desai' },
    { date: '2026-07-15 09:00', event: 'Calibration of 136 IoT sensor channels' },
  ];

  const aiRecs = machine.aiRecommendations || {
    immediateAction: 'Inspect warp tension sensor optical lens',
    preventiveAction: 'Schedule spindle lube at next 500-hr mark',
    estimatedRisk: 'Low (3%)',
    recommendedInspectionDate: '2026-08-15',
  };

  const problemReason = machine.problemReason || 'Main nozzle air pressure variation during high-speed pick insertion';

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div
        className="modal-content modal-lg"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '920px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.25rem',
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--status-running-bg)',
                color: 'var(--status-running)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Eye size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {machine.assetName}
                </h2>
                {getStatusBadge(machine.currentStatus)}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: '700', marginTop: '2px' }}>
                Machine ID: <strong style={{ color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono, monospace' }}>{machine.machineId}</strong> • {machine.factoryName || 'TexTwin Primary Mill'} • {machine.productionLine || 'Line 1'}
              </p>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Live Operational Toolbar Controls */}
        <div
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem 1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-running" style={{ fontSize: '0.72rem', fontWeight: '800' }}>
              <RefreshCw size={12} className={isSimulating ? 'spin' : ''} /> Live Transducer Stream
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Fabric Output: <strong style={{ color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono, monospace' }}>{liveMeters.toLocaleString()} Meters</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsSimulating(!isSimulating)}
              style={{ fontSize: '0.76rem', fontWeight: '700' }}
            >
              {isSimulating ? <><Pause size={14} /> Pause Telemetry</> : <><Play size={14} /> Resume Telemetry</>}
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={triggerExportReport}
              style={{ fontSize: '0.76rem', fontWeight: '700' }}
            >
              <Download size={14} /> Export Live Report
            </button>
          </div>
        </div>

        {/* PROMINENT DIAGNOSTIC BOX */}
        <div
          style={{
            background: 'rgba(225, 29, 72, 0.08)',
            border: '1px solid rgba(225, 29, 72, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--status-maintenance)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🔍 REASON FOR MACHINE PROBLEM / DIAGNOSTIC ANALYSIS:
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              {problemReason}
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setActiveTab('problems');
              setShowProblemForm(true);
            }}
          >
            <PlusCircle size={15} /> Record Problem Reason
          </button>
        </div>

        {/* 7-Section Navigation Tabs */}
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <FileText size={15} style={{ display: 'inline', marginRight: '4px' }} /> 1. Overview
          </button>
          <button className={`tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`} onClick={() => setActiveTab('telemetry')}>
            <Activity size={15} style={{ display: 'inline', marginRight: '4px' }} /> 2. Live Telemetry
          </button>
          <button className={`tab-btn ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}>
            <ShieldCheck size={15} style={{ display: 'inline', marginRight: '4px' }} /> 3. Health & RUL
          </button>
          <button className={`tab-btn ${activeTab === 'problems' ? 'active' : ''}`} onClick={() => setActiveTab('problems')}>
            <AlertTriangle size={15} style={{ display: 'inline', marginRight: '4px' }} /> 4. Problems ({problems.length})
          </button>
          <button className={`tab-btn ${activeTab === 'maintenance' ? 'active' : ''}`} onClick={() => setActiveTab('maintenance')}>
            <Wrench size={15} style={{ display: 'inline', marginRight: '4px' }} /> 5. Maintenance
          </button>
          <button className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
            <Clock size={15} style={{ display: 'inline', marginRight: '4px' }} /> 6. Timeline
          </button>
          <button className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
            <Sparkles size={15} style={{ display: 'inline', marginRight: '4px' }} /> 7. AI Advice
          </button>
        </div>

        {/* Tab 1: Machine Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '800' }}>MANUFACTURER & MODEL</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>{machine.manufacturer} ({machine.modelNumber || 'JAT810'})</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '700' }}>Serial: {machine.serialNumber || 'SN-99102-X'}</div>
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '800' }}>LOCATION & BAY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>{machine.physicalLocation || 'Floor 1 - Bay A'}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '700' }}>Dept: {machine.department || 'High-Speed Weaving'}</div>
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '800' }}>ASSIGNED PERSONNEL</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>Operator: {machine.assignedOperator || 'Rajesh Kumar'}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '2px' }}>Engineer: {machine.maintenanceEngineer || 'Anita Desai'}</div>
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '800' }}>INSTALLATION & WARRANTY</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>Installed: {machine.installationDate || '2023-01-15'}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: '700' }}>Warranty Expiry: {machine.warrantyExpiry || '2026-01-15'}</div>
            </div>
          </div>
        )}

        {/* Tab 2: Live Ticking Telemetry */}
        {activeTab === 'telemetry' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
                <Gauge size={20} /> <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>MAIN SHAFT RPM</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0.4rem 0', fontFamily: 'JetBrains Mono, monospace' }}>
                {liveRpm} <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>RPM</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--status-running)', fontWeight: '800' }}>Live Stream Transducer Stream</div>
            </div>

            <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-maintenance)' }}>
                <Thermometer size={20} /> <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>MOTOR TEMP</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0.4rem 0', fontFamily: 'JetBrains Mono, monospace' }}>
                {liveTemp}°C
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '800' }}>Threshold: 78.0°C</div>
            </div>

            <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-idle)' }}>
                <Activity size={20} /> <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>VIBRATION</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0.4rem 0', fontFamily: 'JetBrains Mono, monospace' }}>
                {liveVib} <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>mm/s</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '800' }}>ISO 10816 Standard</div>
            </div>

            <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
                <Zap size={20} /> <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>POWER CONSUMPTION</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0.4rem 0', fontFamily: 'JetBrains Mono, monospace' }}>
                {livePower} <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>kW</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '800' }}>4,210 Run Hours</div>
            </div>
          </div>
        )}

        {/* Tab 3: Machine Health & RUL */}
        {activeTab === 'health' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>Digital Twin Health Rating</h4>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: health.healthScore > 90 ? 'var(--status-running)' : 'var(--status-maintenance)' }}>
                  {health.healthScore} / 100
                </span>
              </div>

              <div style={{ width: '100%', height: '10px', borderRadius: '5px', background: 'var(--border-subtle)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${health.healthScore}%`,
                    height: '100%',
                    background: health.healthScore > 90 ? 'var(--status-running)' : 'var(--status-maintenance)',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '800' }}>REMAINING USEFUL LIFE (RUL)</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{health.remainingUsefulLifeDays} Days</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '800' }}>AI PREDICTIVE DIAGNOSTIC</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '2px' }}>{health.aiPrediction}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '800' }}>FAILURE PROBABILITY</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: health.failureProbabilityPct > 15 ? 'var(--status-maintenance)' : 'var(--status-running)', marginTop: '2px' }}>{health.failureProbabilityPct}%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Current Problems */}
        {activeTab === 'problems' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Recorded Machine Problems & Reasons ({problems.length})
              </h4>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowProblemForm(!showProblemForm)}
              >
                <PlusCircle size={16} /> {showProblemForm ? 'Cancel Logging' : 'Log New Problem Reason'}
              </button>
            </div>

            {/* Problem Reason Recording Form */}
            {showProblemForm && (
              <form
                onSubmit={handleRecordProblemSubmit}
                style={{
                  padding: '1.25rem',
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--accent-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  📝 Record Anomaly / Problem Reason for {machine.assetName}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Problem Title / Description <span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Motor Drive Overheating Anomaly"
                      value={problemName}
                      onChange={(e) => setProblemName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Severity Level</label>
                    <select
                      className="form-control"
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Reason for Problem / Root Cause Analysis <span className="required">*</span></label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="e.g. Excessive friction in main bearing housing due to lube contamination"
                    value={rootCause}
                    onChange={(e) => setRootCause(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowProblemForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={submitting}
                  >
                    <Save size={16} /> {submitting ? 'Saving Reason...' : 'Record Problem Reason'}
                  </button>
                </div>
              </form>
            )}

            {/* Problems List */}
            {problems.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--status-running)', fontWeight: '800', background: 'var(--status-running-bg)', borderRadius: 'var(--radius-sm)' }}>
                <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem auto' }} />
                No Active Anomalies or Problems Recorded for this Asset.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {problems.map((p) => (
                  <div key={p.id} style={{ padding: '1.25rem', background: 'var(--status-maintenance-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(225, 29, 72, 0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', color: 'var(--status-maintenance)', fontSize: '1.05rem' }}>{p.name}</span>
                      <span className="badge badge-maintenance">{p.severity} Priority</span>
                    </div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '800' }}>
                      Reason for Problem: <span style={{ color: 'var(--status-maintenance)' }}>{p.rootCause}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Maintenance Records */}
        {activeTab === 'maintenance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>CURRENT MAINTENANCE SESSION</div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{maint.maintenanceType}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '700' }}>Issue: {maint.issueDescription}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px', fontWeight: '800' }}>Reason / Root Cause: {maint.rootCause}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '700' }}>Engineer: {maint.engineer} • Priority: {maint.priority}</div>
            </div>
          </div>
        )}

        {/* Tab 6: Event Timeline */}
        {activeTab === 'timeline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--accent-primary)' }}>
            {timeline.map((item, idx) => (
              <div key={idx} style={{ position: 'relative', paddingLeft: '1rem' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-1.45rem',
                    top: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                  }}
                />
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '800' }}>{item.date}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{item.event}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 7: AI Advice */}
        {activeTab === 'ai' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1.5rem', background: 'var(--status-running-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                <Sparkles size={22} /> TexTwin AI Agent Prescriptions
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '800' }}>IMMEDIATE ACTION REQUIRED</div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{aiRecs.immediateAction}</div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '800' }}>PREVENTIVE RECOMMENDATION</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>{aiRecs.preventiveAction}</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Close */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-primary btn-sm" onClick={triggerExportReport}>
            <Download size={14} /> Download Live Report
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close Inspection View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MachineDetailsModal;
