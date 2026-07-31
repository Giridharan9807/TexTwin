import React, { useState } from 'react';
import { Zap, Leaf, TrendingUp, BarChart, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnergyGaugeRing = ({ percentage = 80, color = '#059669', size = 56, strokeWidth = 5.5, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E2E8F0" strokeWidth={strokeWidth} fill="transparent" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <span style={{ position: 'absolute', fontSize: '0.68rem', fontWeight: '900', color: '#0F172A' }}>
        {label || `${Math.round(percentage)}%`}
      </span>
    </div>
  );
};

const EnergyDashboardCard = () => {
  const navigate = useNavigate();
  const [selectedEnergyItem, setSelectedEnergyItem] = useState(null);

  const energyItems = [
    {
      id: 'today',
      title: "TODAY'S ENERGY",
      val: '1,245 kWh',
      status: '-3.2% vs Yesterday',
      color: '#059669',
      pct: 72,
      label: '72%',
      detail: 'Cumulative power consumed by weaving looms and compressors today.',
      stats: [
        { name: 'Shift 1 Energy (Morning)', val: '450 kWh', cost: '₹3,600' },
        { name: 'Shift 2 Energy (Afternoon)', val: '480 kWh', cost: '₹3,840' },
        { name: 'Shift 3 Energy (Night)', val: '315 kWh', cost: '₹2,520' },
      ],
    },
    {
      id: 'weekly',
      title: 'WEEKLY ENERGY',
      val: '8,715 kWh',
      status: 'Within Projected Budget',
      color: '#2563EB',
      pct: 85,
      label: '85%',
      detail: '7-day power consumption tracking across all facilities.',
      stats: [
        { name: 'Coimbatore Primary Mill', val: '3,850 kWh', cost: 'Budget Target: 4,000 kWh' },
        { name: 'Tirupur Technical Unit', val: '2,640 kWh', cost: 'Budget Target: 2,800 kWh' },
        { name: 'Gujarat Denim Hub', val: '2,225 kWh', cost: 'Budget Target: 2,400 kWh' },
      ],
    },
    {
      id: 'peak',
      title: 'PEAK LOAD',
      val: '18.5 kW',
      status: 'Logged at 14:30 PM',
      color: '#2563EB',
      pct: 92.5,
      label: '18.5',
      detail: 'Highest simultaneous power demand recorded during peak shift.',
      stats: [
        { name: 'Peak Time Window', val: '14:00 - 15:00 PM', cost: 'Peak Tariff Rate' },
        { name: 'Compressor Load Share', val: '6.2 kW', cost: '33.5% of Peak Load' },
        { name: 'Looms Motor Drive Load', val: '12.3 kW', cost: '66.5% of Peak Load' },
      ],
    },
    {
      id: 'avg',
      title: 'AVG CONSUMPTION',
      val: '14.2 kW',
      status: 'Optimal Baseload Rate',
      color: '#059669',
      pct: 71,
      label: '14.2',
      detail: 'Average continuous operating power demand across active hours.',
      stats: [
        { name: 'Baseload Power Factor', val: '0.98 PF', cost: 'Optimal Electrical Efficiency' },
        { name: 'Specific Energy Rate', val: '0.42 kWh / meter', cost: 'Grade A Efficiency' },
        { name: 'Grid Frequency Stability', val: '50.02 Hz', cost: 'Stable Supply' },
      ],
    },
    {
      id: 'carbon',
      title: 'CARBON FOOTPRINT',
      val: '0.28 kg CO₂/m',
      status: 'Zero Direct Carbon',
      color: '#059669',
      pct: 98,
      label: 'A+',
      detail: 'Emissions intensity rating per meter of woven fabric.',
      stats: [
        { name: 'Renewable Solar Power Share', val: '35.4%', cost: 'Rooftop Solar Plant' },
        { name: 'Direct Scope 1 Emissions', val: '0.00 kg', cost: 'Zero Direct Carbon' },
        { name: 'CO₂ Offset Today', val: '380 kg CO₂', cost: 'ISO 14064 Compliant' },
      ],
    },
  ];

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={20} style={{ color: 'var(--accent-primary)' }} /> Plant Energy & Sustainability Analytics
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
            Power Usage, Peak Demand Hours, and Carbon Footprint Tracking (Click any card to inspect energy metrics)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/sensors')} style={{ fontSize: '0.76rem', fontWeight: '800' }}>
            Energy Sensors <ChevronRight size={14} />
          </button>
          <span className="badge badge-running" style={{ fontWeight: '800' }}>Eco Rating: Grade A+</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.1rem' }}>
        {energyItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedEnergyItem(item)}
            style={{
              padding: '1.1rem',
              background: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(37,99,235,0.1)';
              e.currentTarget.style.borderColor = item.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
            title="Click to inspect energy tariff & carbon offset details"
          >
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#64748B' }}>{item.title}</div>
              <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>{item.val}</div>
              <div style={{ fontSize: '0.72rem', color: item.color, marginTop: '3px', fontWeight: '800' }}>{item.status}</div>
            </div>
            <EnergyGaugeRing percentage={item.pct} color={item.color} label={item.label} />
          </div>
        ))}
      </div>

      {/* Energy & Carbon Sustainability Analytics Modal */}
      {selectedEnergyItem && (
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
          onClick={() => setSelectedEnergyItem(null)}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '1.75rem',
              borderRadius: '14px',
              maxWidth: '680px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              border: `2px solid ${selectedEnergyItem.color}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <EnergyGaugeRing percentage={selectedEnergyItem.pct} color={selectedEnergyItem.color} label={selectedEnergyItem.label} size={48} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A' }}>{selectedEnergyItem.title} Analytics</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>{selectedEnergyItem.detail}</div>
                </div>
              </div>
              <button onClick={() => setSelectedEnergyItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '0.85rem 1.1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>
              ⚡ Current Metric Value: <span style={{ color: selectedEnergyItem.color, fontSize: '1.1rem' }}>{selectedEnergyItem.val}</span> ({selectedEnergyItem.status})
            </div>

            <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#475569', marginBottom: '0.65rem' }}>PLANT ENERGY STATS & CARBON METRICS:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {selectedEnergyItem.stats.map((s, idx) => (
                <div key={idx} style={{ padding: '0.85rem 1.1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>{s.name}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '900', color: selectedEnergyItem.color }}>{s.val}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '700' }}>{s.cost}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedEnergyItem(null)}>
                Close
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => { setSelectedEnergyItem(null); navigate('/sensors'); }}>
                Open Sensors & Energy Module <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyDashboardCard;
