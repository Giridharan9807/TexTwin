import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Zap,
  Gauge,
  Award,
  Layers,
  Sparkles,
  Activity,
  Cpu,
  Brain,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  Clock,
  PieChart as PieIcon,
  ArrowUpRight,
  Flame,
  Droplets,
  Wind,
} from 'lucide-react';
import ProductionChart from '../components/ProductionChart';
import EnergyCard from '../components/EnergyCard';
import HealthTrendChart from '../components/HealthTrendChart';

const AnalyticsPage = () => {
  const [prodTimeframe, setProdTimeframe] = useState('Daily'); // Daily | Weekly | Monthly
  const [sensorTab, setSensorTab] = useState('Temperature'); // Temperature | RPM | Pressure | Vibration | Humidity | Power
  const [energyTab, setEnergyTab] = useState('Today'); // Today | Yesterday | Weekly | Monthly

  // AI Health Distribution Gauge Counts
  const healthDistribution = {
    excellent: 18,
    good: 1,
    critical: 1,
  };

  // Root Cause Breakdown
  const rootCauseData = [
    { cause: 'Bearing Wear / Fatigue', pct: '42%', color: '#EF4444' },
    { cause: 'Motor Overheat / Electrical', pct: '25%', color: '#F59E0B' },
    { cause: 'Air Pressure Drop / Nozzle', pct: '18%', color: '#0284C7' },
    { cause: 'Yarn Tension / Snaps', pct: '15%', color: '#8B5CF6' },
  ];

  return (
    <div style={{ padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', minHeight: 'calc(100vh - 120px)' }}>
      
      {/* 1. PAGE HEADER */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ color: '#0F172A', fontSize: '1.5rem', fontWeight: '900' }}>📊 AI Analytics & OEE Center</h1>
            <span className="badge badge-running" style={{ fontWeight: '800' }}>
              AI Prediction Accuracy: 99.4%
            </span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px' }}>
            Overall Equipment Effectiveness (OEE), Sensor Trends, Downtime Root Cause Analysis & Energy Analytics
          </p>
        </div>
      </div>

      {/* 2. OVERALL KPIs (OEE, Availability, Performance, Quality, MTBF, MTTR, Downtime) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.1rem', marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.1rem', background: '#ffffff', borderRadius: '12px', border: '2px solid #2563EB' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>OEE SCORE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2563EB', marginTop: '2px' }}>96.4%</div>
          <div style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: '800', marginTop: '2px' }}>+1.8% vs Goal</div>
        </div>

        <div className="glass-card" style={{ padding: '1.1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>AVAILABILITY</div>
          <div style={{ fontSize: '1.7rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>98.2%</div>
          <div style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: '700', marginTop: '2px' }}>Uptime High</div>
        </div>

        <div className="glass-card" style={{ padding: '1.1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>PERFORMANCE</div>
          <div style={{ fontSize: '1.7rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>97.5%</div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>Speed Index</div>
        </div>

        <div className="glass-card" style={{ padding: '1.1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>QUALITY RATE</div>
          <div style={{ fontSize: '1.7rem', fontWeight: '900', color: '#16A34A', marginTop: '2px' }}>99.1%</div>
          <div style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: '800', marginTop: '2px' }}>First-Choice</div>
        </div>

        <div className="glass-card" style={{ padding: '1.1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>MTBF (Mean Time)</div>
          <div style={{ fontSize: '1.7rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>340 Hrs</div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>Between Failures</div>
        </div>

        <div className="glass-card" style={{ padding: '1.1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>MTTR (Repair Time)</div>
          <div style={{ fontSize: '1.7rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>1.4 Hrs</div>
          <div style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: '700', marginTop: '2px' }}>Mean Repair Time</div>
        </div>

        <div className="glass-card" style={{ padding: '1.1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>DOWNTIME LOSS</div>
          <div style={{ fontSize: '1.7rem', fontWeight: '900', color: '#EF4444', marginTop: '2px' }}>1.8%</div>
          <div style={{ fontSize: '0.7rem', color: '#EF4444', fontWeight: '800', marginTop: '2px' }}>Unplanned Loss</div>
        </div>
      </div>

      {/* 3. AI HEALTH DISTRIBUTION & AI PREDICTION TREND ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        {/* AI Health Distribution Gauge Widget */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} style={{ color: '#2563EB' }} /> AI Health Distribution Gauge
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center', margin: '0.85rem 0' }}>
            <div style={{ padding: '0.85rem', background: '#DCFCE7', borderRadius: '8px', border: '1px solid #16A34A' }}>
              <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: '800' }}>EXCELLENT</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#166534', marginTop: '2px' }}>{healthDistribution.excellent}</div>
              <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: '700' }}>Machines</div>
            </div>

            <div style={{ padding: '0.85rem', background: '#FEF3C7', borderRadius: '8px', border: '1px solid #F59E0B' }}>
              <div style={{ fontSize: '0.72rem', color: '#92400E', fontWeight: '800' }}>GOOD</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#92400E', marginTop: '2px' }}>{healthDistribution.good}</div>
              <div style={{ fontSize: '0.68rem', color: '#92400E', fontWeight: '700' }}>Machine</div>
            </div>

            <div style={{ padding: '0.85rem', background: '#FEE2E2', borderRadius: '8px', border: '1px solid #EF4444' }}>
              <div style={{ fontSize: '0.72rem', color: '#991B1B', fontWeight: '800' }}>CRITICAL</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#991B1B', marginTop: '2px' }}>{healthDistribution.critical}</div>
              <div style={{ fontSize: '0.68rem', color: '#991B1B', fontWeight: '700' }}>Machine</div>
            </div>
          </div>
        </div>

        {/* AI Prediction Trend Widget */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} style={{ color: '#8B5CF6' }} /> AI Prediction Trend & Accuracy
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center', margin: '0.85rem 0' }}>
            <div style={{ padding: '0.85rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>FAILURES PREDICTED</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#EF4444', marginTop: '2px' }}>12</div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700' }}>This Week</div>
            </div>

            <div style={{ padding: '0.85rem', background: '#DCFCE7', borderRadius: '8px', border: '1px solid #16A34A' }}>
              <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: '800' }}>FAILURES AVOIDED</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#166534', marginTop: '2px' }}>10</div>
              <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: '800' }}>Saved Downtime</div>
            </div>

            <div style={{ padding: '0.85rem', background: '#F5F3FF', borderRadius: '8px', border: '1px solid #8B5CF6' }}>
              <div style={{ fontSize: '0.72rem', color: '#8B5CF6', fontWeight: '800' }}>AI ACCURACY</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#8B5CF6', marginTop: '2px' }}>99.4%</div>
              <div style={{ fontSize: '0.68rem', color: '#8B5CF6', fontWeight: '800' }}>XGBoost v4</div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. SENSOR TREND TABS WIDGET */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} style={{ color: '#2563EB' }} /> Sensor Telemetry Trend Analysis
          </h3>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['Temperature', 'RPM', 'Pressure', 'Vibration', 'Humidity', 'Power'].map((st) => (
              <button
                key={st}
                onClick={() => setSensorTab(st)}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  borderRadius: '6px',
                  border: `1.5px solid ${sensorTab === st ? '#2563EB' : '#CBD5E1'}`,
                  background: sensorTab === st ? '#EFF6FF' : '#ffffff',
                  color: sensorTab === st ? '#2563EB' : '#475569',
                  cursor: 'pointer',
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A' }}>
          Showing 24-Hour Telemetry Trend Curve for <span style={{ color: '#2563EB' }}>{sensorTab}</span> across all 20 connected looms. Peak stability index: <span style={{ color: '#16A34A' }}>99.2%</span>.
        </div>
      </div>

      {/* 5. ROOT CAUSE ANALYTICS & DOWNTIME ANALYSIS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        {/* Root Cause Analytics Data */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieIcon size={18} style={{ color: '#2563EB' }} /> AI Root Cause Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {rootCauseData.map((rc) => (
              <div key={rc.cause} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.85rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: '800', color: '#0F172A' }}>{rc.cause}</span>
                <span className="badge" style={{ background: `${rc.color}15`, color: rc.color, fontSize: '0.85rem', fontWeight: '900' }}>
                  {rc.pct}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Downtime Analysis Bar Chart */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} style={{ color: '#2563EB' }} /> Downtime & Stoppage Analysis
          </h3>
          <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.82rem', fontWeight: '700', color: '#475569' }}>
            ● Unplanned Mechanical Downtime: <strong>1.4 Hours</strong> (Bearing Alignment)<br />
            ● Scheduled PM Maintenance: <strong>3.2 Hours</strong><br />
            ● Nozzle Flush Downtime: <strong>0.5 Hours</strong>
          </div>
        </div>

      </div>

      {/* 6. CHARTS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
        <ProductionChart />
        <HealthTrendChart />
      </div>

      {/* 7. ENERGY BREAKDOWN */}
      <div style={{ marginBottom: '1.75rem' }}>
        <EnergyCard />
      </div>
    </div>
  );
};

export default AnalyticsPage;
