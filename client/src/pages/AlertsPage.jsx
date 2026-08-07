import React, { useState } from 'react';
import AlertsPanel from '../components/AlertsPanel';
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Bell,
  BellOff,
  Filter,
  Plus,
  Sliders,
  X,
  Volume2,
  VolumeX,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  Brain,
  Activity,
  PieChart,
} from 'lucide-react';

const AlertsPage = () => {
  const [trendTab, setTrendTab] = useState('Daily'); // Daily | Weekly | Monthly
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Active Alert Counts
  const alertCounts = {
    critical: 3,
    warning: 5,
    info: 12,
  };

  // Alert Heatmap (Which machines generate more alerts)
  const alertHeatmap = [
    { machine: 'LOOM-201', count: 8, severity: 'Critical', bg: '#FEE2E2', border: '#EF4444', text: '#991B1B' },
    { machine: 'LOOM-501', count: 5, severity: 'Warning', bg: '#FEF3C7', border: '#F59E0B', text: '#92400E' },
    { machine: 'LOOM-703', count: 4, severity: 'Warning', bg: '#FEF3C7', border: '#F59E0B', text: '#92400E' },
    { machine: 'LOOM-104', count: 3, severity: 'Info', bg: '#EFF6FF', border: '#3B82F6', text: '#1E3A8A' },
    { machine: 'LOOM-101', count: 1, severity: 'Info', bg: '#EFF6FF', border: '#3B82F6', text: '#1E3A8A' },
    { machine: 'LOOM-301', count: 1, severity: 'Info', bg: '#EFF6FF', border: '#3B82F6', text: '#1E3A8A' },
  ];

  // Detailed Alert Cards
  const alertDetails = [
    {
      id: 'ALT-901',
      machine: 'LOOM-201',
      sensor: 'Temperature Sensor (Motor)',
      value: '82.4 °C',
      threshold: '> 75.0 °C',
      rootCause: 'Drive Shaft Bearing Friction Wear',
      confidence: '99.4%',
      recommendation: 'Replace bearing unit & apply synthetic lubricant.',
      autoAction: 'Temperature 82°C ➔ Automatically Reduce RPM ➔ Notify Engineer ➔ Create Work Order',
      time: '2 mins ago',
      status: 'Critical',
    },
    {
      id: 'ALT-902',
      machine: 'LOOM-501',
      sensor: 'Vibration Sensor',
      value: '0.42 mm/s',
      threshold: '> 0.35 mm/s',
      rootCause: 'Main Shaft Alignment Deviation',
      confidence: '98.2%',
      recommendation: 'Perform laser shaft alignment.',
      autoAction: 'Vibration 0.42mm/s ➔ Signal Operator Alert ➔ Dispatch Maintenance Tech',
      time: '14 mins ago',
      status: 'Warning',
    },
    {
      id: 'ALT-903',
      machine: 'LOOM-703',
      sensor: 'Air Pressure Sensor',
      value: '4.8 Bar',
      threshold: '< 5.5 Bar',
      rootCause: 'Pneumatic Header Line Pressure Drop',
      confidence: '96.8%',
      recommendation: 'Boost air compressor header pressure.',
      autoAction: 'Pressure Drop ➔ Trigger Auxiliary Compressor ➔ Notify Shift Manager',
      time: '35 mins ago',
      status: 'Warning',
    },
  ];

  return (
    <div style={{ padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', minHeight: 'calc(100vh - 120px)' }}>
      
      {/* 1. PAGE HEADER */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ color: '#0F172A', fontSize: '1.5rem', fontWeight: '900' }}>🚨 AI Incident & Alerts Center</h1>
            <span className="badge badge-maintenance" style={{ fontWeight: '800' }}>
              3 Critical Incidents Active
            </span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px' }}>
            Real-Time AI Alarm Incident Logs, Alert Heatmaps, Automated Action Workflows & Resolution Meters
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setToast('Alarm notification dispatch system online!')} style={{ background: '#2563EB', fontWeight: '800' }}>
          <Bell size={16} /> Notification Dispatcher
        </button>
      </div>

      {toast && (
        <div style={{ padding: '0.85rem 1.25rem', background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: '8px', color: '#166534', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {toast}
        </div>
      )}

      {/* 2. ACTIVE ALERT COUNTS & RESOLUTION METER CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.25rem', background: '#FEE2E2', borderRadius: '12px', border: '1px solid #EF4444' }}>
          <div style={{ fontSize: '0.74rem', color: '#991B1B', fontWeight: '800' }}>CRITICAL ALERTS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#991B1B', marginTop: '2px' }}>{alertCounts.critical}</div>
          <div style={{ fontSize: '0.72rem', color: '#991B1B', fontWeight: '800', marginTop: '2px' }}>P1 Immediate Action</div>
        </div>

        <div style={{ padding: '1.25rem', background: '#FEF3C7', borderRadius: '12px', border: '1px solid #F59E0B' }}>
          <div style={{ fontSize: '0.74rem', color: '#92400E', fontWeight: '800' }}>WARNING ALERTS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#92400E', marginTop: '2px' }}>{alertCounts.warning}</div>
          <div style={{ fontSize: '0.72rem', color: '#92400E', fontWeight: '800', marginTop: '2px' }}>P2 Elevated Risk</div>
        </div>

        <div style={{ padding: '1.25rem', background: '#EFF6FF', borderRadius: '12px', border: '1px solid #3B82F6' }}>
          <div style={{ fontSize: '0.74rem', color: '#1E3A8A', fontWeight: '800' }}>INFORMATIONAL</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1E3A8A', marginTop: '2px' }}>{alertCounts.info}</div>
          <div style={{ fontSize: '0.72rem', color: '#1E3A8A', fontWeight: '800', marginTop: '2px' }}>P3 System Logs</div>
        </div>

        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>ALERT RESOLUTION RATE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#16A34A', marginTop: '2px' }}>82% Resolved</div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>18% Pending Verification</div>
        </div>
      </div>

      {/* 3. AI AUTOMATED ACTION WORKFLOW BANNER */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1.5px solid #2563EB' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#2563EB', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          🤖 EXAMPLE AI CLOSED-LOOP AUTO ACTION FLOW
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A' }}>
          <div style={{ padding: '0.5rem 0.85rem', background: '#FEE2E2', borderRadius: '8px', border: '1px solid #EF4444', color: '#991B1B' }}>
            🌡️ Temperature 82°C
          </div>
          <ArrowRight size={16} style={{ color: '#64748B' }} />
          <div style={{ padding: '0.5rem 0.85rem', background: '#EFF6FF', borderRadius: '8px', border: '1px solid #2563EB', color: '#2563EB' }}>
            ⚡ Automatically Reduce RPM
          </div>
          <ArrowRight size={16} style={{ color: '#64748B' }} />
          <div style={{ padding: '0.5rem 0.85rem', background: '#F1F5F9', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
            👷 Notify Engineer
          </div>
          <ArrowRight size={16} style={{ color: '#64748B' }} />
          <div style={{ padding: '0.5rem 0.85rem', background: '#DCFCE7', borderRadius: '8px', border: '1px solid #16A34A', color: '#166534' }}>
            📋 Create Work Order
          </div>
        </div>
      </div>

      {/* 4. ALERT HEAT MAP GRID */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} style={{ color: '#EF4444' }} /> Alert Heat Map (Machines Generating Most Alerts)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.85rem' }}>
          {alertHeatmap.map((h) => (
            <div
              key={h.machine}
              style={{
                padding: '0.85rem',
                borderRadius: '10px',
                background: h.bg,
                border: `1.5px solid ${h.border}`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: '900', color: h.text, fontFamily: 'JetBrains Mono' }}>{h.machine}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: h.text, margin: '2px 0' }}>{h.count} Alerts</div>
              <div style={{ fontSize: '0.68rem', fontWeight: '800', color: h.text }}>{h.severity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. DETAILED ALERT INCIDENT CARDS (Timeline Flow: Newest -> Oldest) */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={18} style={{ color: '#EF4444' }} /> Alert Details & Incident Timeline (Newest ➔ Oldest)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alertDetails.map((a) => (
            <div key={a.id} style={{ padding: '1.1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: '900', fontFamily: 'JetBrains Mono' }}>{a.id}</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: '900', color: '#0F172A' }}>{a.machine}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>• {a.sensor}</span>
                </div>
                <span className="badge" style={{ background: a.status === 'Critical' ? '#FEE2E2' : '#FEF3C7', color: a.status === 'Critical' ? '#991B1B' : '#92400E', fontWeight: '800' }}>
                  {a.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', margin: '0.65rem 0', padding: '0.65rem 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>LIVE VALUE / THRESHOLD</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '900', color: '#EF4444' }}>{a.value} (Limit {a.threshold})</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>PREDICTED ROOT CAUSE</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>{a.rootCause}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '800' }}>AI CONFIDENCE</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '900', color: '#8B5CF6' }}>{a.confidence}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '700' }}>
                💡 Recommendation: {a.recommendation}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#2563EB', fontWeight: '800', marginTop: '4px' }}>
                ⚡ Auto Action: {a.autoAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. MAIN ALERTS PANEL */}
      <AlertsPanel />
    </div>
  );
};

export default AlertsPage;
