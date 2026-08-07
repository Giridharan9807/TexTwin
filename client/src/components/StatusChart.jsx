import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
  Activity,
  Gauge,
  Zap,
  Thermometer,
  PlayCircle,
  PauseCircle,
  Wrench,
  Sparkles,
  BarChart3,
  Factory,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ running = 16, idle = 2, maintenance = 2 }) => {
  const navigate = useNavigate();
  const total = running + idle + maintenance || 20;

  const runningPct = Math.round((running / total) * 100);
  const idlePct = Math.round((idle / total) * 100);
  const maintPct = Math.round((maintenance / total) * 100);

  const data = {
    labels: [
      `Running (${runningPct}%)`,
      `Idle (${idlePct}%)`,
      `Maintenance (${maintPct}%)`,
    ],
    datasets: [
      {
        data: [running, idle, maintenance],
        backgroundColor: [
          '#22C55E', // Machine Health / Running (Green #22C55E)
          '#F59E0B', // Idle (Amber #F59E0B)
          '#F97316', // Downtime / Maintenance (Orange #F97316)
        ],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2.5,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#1E293B',
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: '700' },
          padding: 8,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#FFFFFF',
        bodyColor: '#E2E8F0',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 8,
      },
    },
    cutout: '64%',
  };

  const statusDetails = [
    { label: 'Running', count: running, pct: runningPct, color: '#22C55E', bgColor: '#DCFCE7', icon: PlayCircle },
    { label: 'Idle', count: idle, pct: idlePct, color: '#F59E0B', bgColor: '#FEF3C7', icon: PauseCircle },
    { label: 'Maint.', count: maintenance, pct: maintPct, color: '#F97316', bgColor: '#FFF7ED', icon: Wrench },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Activity size={18} style={{ color: '#22C55E' }} /> Fleet Status Breakdown
            </h3>
            <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '600' }}>
              Real-Time Weaving Loom Operational Sync
            </span>
          </div>
          <span className="badge badge-running" style={{ fontWeight: '800', fontSize: '0.7rem' }}>Live Feed</span>
        </div>

        {/* Donut Chart Canvas */}
        <div style={{ height: '190px', width: '100%', position: 'relative', margin: '0.25rem 0' }}>
          <Doughnut data={data} options={options} />
          <div
            style={{
              position: 'absolute',
              top: '38%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#1E293B', lineHeight: 1 }}>{total}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748B', marginTop: '2px', letterSpacing: '0.5px' }}>
              TOTAL LOOMS
            </div>
          </div>
        </div>

        {/* Status Tier Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', margin: '0.6rem 0' }}>
          {statusDetails.map((sd, idx) => {
            const Icon = sd.icon;
            return (
              <div
                key={idx}
                style={{
                  background: sd.bgColor,
                  border: `1px solid ${sd.color}40`,
                  borderRadius: '6px',
                  padding: '0.45rem 0.35rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', fontSize: '0.68rem', fontWeight: '800', color: sd.color }}>
                  <Icon size={11} /> {sd.label}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1E293B', margin: '1px 0' }}>
                  {sd.count} <span style={{ fontSize: '0.65rem', color: '#64748B' }}>({sd.pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Primary Metrics Grid Box */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '0.65rem 0.85rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.5rem',
            marginBottom: '0.6rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Gauge size={14} style={{ color: '#2563EB' }} />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '800' }}>FLEET OEE</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#1E293B' }}>96.4%</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Activity size={14} style={{ color: '#4F46E5' }} />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '800' }}>OUTPUT RATE</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#1E293B' }}>1,485 M/hr</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Zap size={14} style={{ color: '#14B8A6' }} />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '800' }}>ACTIVE SENSORS</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#1E293B' }}>136 Feeds</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Thermometer size={14} style={{ color: '#EF4444' }} />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '800' }}>AVG TEMP</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#1E293B' }}>54.2°C</div>
            </div>
          </div>
        </div>

        {/* Gauges Bar */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '0.6rem 0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <BarChart3 size={13} style={{ color: '#2563EB' }} /> Loom Speed Index
            </span>
            <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: '800' }}>1,050 RPM (95%)</span>
          </div>
          <div style={{ height: '5px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: '95%', height: '100%', background: 'linear-gradient(90deg, #2563EB, #06B6D4)', borderRadius: '3px' }}></div>
          </div>

          <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={13} style={{ color: '#8B5CF6' }} /> Fabric Quality
            </span>
            <span style={{ fontSize: '0.7rem', color: '#8B5CF6', fontWeight: '800' }}>99.1% Grade A+</span>
          </div>
          <div style={{ height: '5px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: '99.1%', height: '100%', background: 'linear-gradient(90deg, #8B5CF6, #4F46E5)', borderRadius: '3px' }}></div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
        <button
          onClick={() => navigate('/assets')}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.76rem', fontWeight: '700' }}
        >
          <Activity size={14} style={{ color: '#22C55E' }} /> Fleet Telemetry
        </button>
        <button
          onClick={() => navigate('/plants')}
          className="btn btn-primary btn-sm"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.76rem', fontWeight: '700' }}
        >
          <Factory size={14} /> Plant Hierarchy
        </button>
      </div>
    </div>
  );
};

export default StatusChart;
