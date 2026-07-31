import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const CriticalityChart = ({ high = 11, medium = 6, low = 3 }) => {
  const navigate = useNavigate();

  const total = high + medium + low || 1;
  const highPct = Math.round((high / total) * 100);
  const mediumPct = Math.round((medium / total) * 100);
  const lowPct = Math.round((low / total) * 100);

  const data = {
    labels: [`High Risk (${highPct}%)`, `Medium Risk (${mediumPct}%)`, `Low Risk (${lowPct}%)`],
    datasets: [
      {
        data: [high, medium, low],
        backgroundColor: [
          '#8B5CF6', // High Risk - AI Purple #8B5CF6
          '#F59E0B', // Medium Risk - Warning Amber #F59E0B
          '#2563EB', // Low Risk - Info Blue #2563EB
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
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' },
          usePointStyle: true,
          boxWidth: 8,
          padding: 8,
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

  const tierDetails = [
    { tier: 'High', color: '#8B5CF6', bgColor: '#F5F3FF', borderColor: 'rgba(139, 92, 246, 0.25)', count: high, pct: highPct, rul: '142h' },
    { tier: 'Medium', color: '#F59E0B', bgColor: '#FEF3C7', borderColor: 'rgba(245, 158, 11, 0.25)', count: medium, pct: mediumPct, rul: '480h' },
    { tier: 'Low', color: '#2563EB', bgColor: '#EFF6FF', borderColor: 'rgba(37, 99, 235, 0.25)', count: low, pct: lowPct, rul: '1,450h' },
  ];

  const watchlist = [
    {
      machineId: 'LOOM-201',
      name: 'Dornier Heavy Shuttleless',
      health: 68,
      prob: '78%',
      recommendation: 'Drive shaft bearing fatigue. Replace bearing within 14 hrs.',
    },
    {
      machineId: 'LOOM-104',
      name: 'Tsudakoma Water Jet',
      health: 88,
      prob: '42%',
      recommendation: 'Nozzle scale build-up detected. Run pressure flush cycle.',
    },
  ];

  return (
    <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} style={{ color: '#8B5CF6' }} /> Asset Criticality Risk
            </h3>
            <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '600' }}>
              AI Predictive Health & Tier Distribution
            </span>
          </div>
          <span className="badge" style={{ background: '#F5F3FF', color: '#8B5CF6', border: '1px solid #8B5CF6', fontWeight: '800', fontSize: '0.7rem' }}>AI Risk Index</span>
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
            <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#8B5CF6', lineHeight: 1 }}>{high}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748B', marginTop: '2px', letterSpacing: '0.5px' }}>
              HIGH RISK
            </div>
          </div>
        </div>

        {/* Tier Analytical Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', margin: '0.6rem 0' }}>
          {tierDetails.map((td, idx) => (
            <div
              key={idx}
              style={{
                background: td.bgColor,
                border: `1px solid ${td.borderColor}`,
                borderRadius: '6px',
                padding: '0.45rem 0.35rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.68rem', fontWeight: '800', color: td.color, textTransform: 'uppercase' }}>
                {td.tier} Risk
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1E293B', margin: '1px 0' }}>
                {td.count} <span style={{ fontSize: '0.65rem', color: '#64748B' }}>({td.pct}%)</span>
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: '700', color: '#64748B' }}>
                RUL: {td.rul}
              </div>
            </div>
          ))}
        </div>

        {/* High Risk Watchlist */}
        <div
          style={{
            background: '#F5F3FF',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '6px',
            padding: '0.65rem 0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
          }}
        >
          <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <AlertTriangle size={13} /> HIGH-RISK WATCHLIST
            </span>
            <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>2 Flagged Assets</span>
          </div>

          {watchlist.map((item) => (
            <div
              key={item.machineId}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                padding: '0.45rem 0.6rem',
                borderRadius: '6px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontWeight: '800', color: '#1E293B' }}>
                <div>
                  <span style={{ color: '#2563EB', fontFamily: 'JetBrains Mono', marginRight: '4px' }}>{item.machineId}</span>
                  <span>{item.name}</span>
                </div>
                <span style={{ color: '#EF4444', fontWeight: '800', fontSize: '0.72rem' }}>
                  {item.health}% Health
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600' }}>
                <Sparkles size={11} style={{ color: '#8B5CF6', flexShrink: 0 }} />
                <span>{item.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
        <button
          onClick={() => navigate('/what-if')}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.76rem', fontWeight: '700' }}
        >
          <Cpu size={14} style={{ color: '#2563EB' }} /> AI Simulation
        </button>
        <button
          onClick={() => navigate('/assets')}
          className="btn btn-primary btn-sm"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.76rem', fontWeight: '700' }}
        >
          <Wrench size={14} /> Dispatch Repair
        </button>
      </div>
    </div>
  );
};

export default CriticalityChart;
