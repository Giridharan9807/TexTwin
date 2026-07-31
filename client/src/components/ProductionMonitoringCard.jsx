import React, { useState } from 'react';
import { Gauge, CheckCircle2, AlertOctagon, Zap, Award, Layers, X, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CircleGauge = ({ value, max = 100, color = '#2563EB', size = 56, strokeWidth = 5.5, label, suffix = '%' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const strokeDashoffset = circumference - (pct / 100) * circumference;

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
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <span style={{ position: 'absolute', fontSize: '0.7rem', fontWeight: '900', color: '#0F172A' }}>
        {label !== undefined ? label : `${value}${suffix}`}
      </span>
    </div>
  );
};

const ProductionMonitoringCard = () => {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState(null);

  const metricsData = [
    {
      id: 'today',
      title: "TODAY'S PRODUCTION",
      value: '14,250 m',
      status: '89.1% Target Progress',
      color: '#2563EB',
      gaugeVal: 89.1,
      detail: 'Meters woven today across Line 1, Line 2, and Line 3.',
      shifts: [
        { shift: 'Shift 1 (Morning)', yield: '5,200 m', target: '5,333 m', status: '97.5%' },
        { shift: 'Shift 2 (Afternoon)', yield: '5,100 m', target: '5,333 m', status: '95.6%' },
        { shift: 'Shift 3 (Night)', yield: '3,950 m', target: '5,334 m', status: '74.0%' },
      ],
    },
    {
      id: 'target',
      title: 'TARGET PRODUCTION',
      value: '16,000 m',
      status: 'Remaining: 1,750 M',
      color: '#0EA5E9',
      gaugeVal: 100,
      label: '100%',
      detail: 'Cumulative daily plant production objective.',
      shifts: [
        { shift: 'Line 1 - Speedy Gonzalez', yield: '6,200 m', target: '6,000 m', status: 'Exceeded' },
        { shift: 'Line 2 - Heavy Air Jet', yield: '4,850 m', target: '5,500 m', status: 'On Track' },
        { shift: 'Line 3 - Rapier Weaving', yield: '3,200 m', target: '4,500 m', status: 'In Progress' },
      ],
    },
    {
      id: 'efficiency',
      title: 'MACHINE EFFICIENCY',
      value: '96.4%',
      status: 'Optimal Grade A',
      color: '#16A34A',
      gaugeVal: 96.4,
      detail: 'Fleet-wide machine uptime vs planned operating hours.',
      shifts: [
        { shift: 'Availability Rate', yield: '98.2%', target: '95.0%', status: 'World Class' },
        { shift: 'Performance Index', yield: '97.1%', target: '95.0%', status: 'Optimal' },
        { shift: 'Quality Rate', yield: '99.1%', target: '98.5%', status: 'Grade A+' },
      ],
    },
    {
      id: 'quality',
      title: 'FABRIC QUALITY',
      value: '99.1%',
      status: 'First-Choice Standard',
      color: '#059669',
      gaugeVal: 99.1,
      detail: 'First-choice fabric yardage without major weaving defects.',
      shifts: [
        { shift: 'First-Choice Fabric', yield: '14,121 m', target: '14,000 m', status: '99.1%' },
        { shift: 'Minor B-Grade Fabric', yield: '129 m', target: '< 200 m', status: '0.9%' },
        { shift: 'Defect Free Rate', yield: '99.1%', target: '98.5%', status: 'Passed' },
      ],
    },
    {
      id: 'rejected',
      title: 'REJECTED FABRIC',
      value: '0.9%',
      status: 'Below 1.5% Limit',
      color: '#EA580C',
      gaugeVal: 0.9,
      maxVal: 5,
      label: '0.9%',
      detail: 'Fabric scrap percentage due to warp/weft anomalies.',
      shifts: [
        { shift: 'Warp Tension Defect', yield: '0.4%', target: '< 0.8%', status: 'Low Risk' },
        { shift: 'Weft Filling Anomaly', yield: '0.3%', target: '< 0.5%', status: 'Nominal' },
        { shift: 'Selvage Trim Scrap', yield: '0.2%', target: '< 0.3%', status: 'Normal' },
      ],
    },
    {
      id: 'speed',
      title: 'PRODUCTION SPEED',
      value: '1,080 RPM',
      status: 'High-Speed Air Jet',
      color: '#7C3AED',
      gaugeVal: 90,
      label: '1080',
      detail: 'Average main shaft rotation speed across active looms.',
      shifts: [
        { shift: 'Toyota Air Jet Looms', yield: '1,120 RPM', target: '1,100 RPM', status: 'High Speed' },
        { shift: 'Picanol Rapier Looms', yield: '1,040 RPM', target: '1,050 RPM', status: 'Optimal' },
        { shift: 'Dornier Shuttleless', yield: '920 RPM', target: '950 RPM', status: 'Maintenance' },
      ],
    },
  ];

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Gauge size={20} style={{ color: 'var(--accent-primary)' }} /> Live Production Output & Quality Monitoring
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
            Weaving Loom Output Yield, Defect Rates, and Line Speeds (Click any card to inspect related analytics)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/analytics')} style={{ fontSize: '0.76rem', fontWeight: '800' }}>
            Full Analytics <ChevronRight size={14} />
          </button>
          <span className="badge badge-running" style={{ fontWeight: '800' }}>Shift Target: 16,000 M</span>
        </div>
      </div>

      {/* Grid of Interactive Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.1rem' }}>
        {metricsData.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelectedMetric(m)}
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
              e.currentTarget.style.borderColor = m.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
            title="Click to view related shift & line breakdown analytics"
          >
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#64748B' }}>{m.title}</div>
              <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>{m.value}</div>
              <div style={{ fontSize: '0.72rem', color: m.color, marginTop: '3px', fontWeight: '800' }}>{m.status}</div>
            </div>
            <CircleGauge value={m.gaugeVal} max={m.maxVal || 100} color={m.color} label={m.label} />
          </div>
        ))}
      </div>

      {/* Interactive Production & Quality Analytics Drilldown Modal */}
      {selectedMetric && (
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
          onClick={() => setSelectedMetric(null)}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '1.75rem',
              borderRadius: '14px',
              maxWidth: '680px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              border: `2px solid ${selectedMetric.color}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CircleGauge value={selectedMetric.gaugeVal} max={selectedMetric.maxVal || 100} color={selectedMetric.color} label={selectedMetric.label} size={48} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A' }}>{selectedMetric.title} Analytics</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>{selectedMetric.detail}</div>
                </div>
              </div>
              <button onClick={() => setSelectedMetric(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '0.85rem 1.1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>
              📊 Current Metric Value: <span style={{ color: selectedMetric.color, fontSize: '1.1rem' }}>{selectedMetric.value}</span> ({selectedMetric.status})
            </div>

            <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#475569', marginBottom: '0.65rem' }}>SHIFT & PRODUCTION LINE BREAKDOWN:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {selectedMetric.shifts.map((s, idx) => (
                <div key={idx} style={{ padding: '0.85rem 1.1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>{s.shift}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>Target Benchmark: {s.target}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '900', color: selectedMetric.color }}>{s.yield}</div>
                    <span className="badge" style={{ background: `${selectedMetric.color}15`, color: selectedMetric.color, fontWeight: '800', fontSize: '0.7rem' }}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedMetric(null)}>
                Close
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => { setSelectedMetric(null); navigate('/analytics'); }}>
                Open Full Analytics Module <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionMonitoringCard;
