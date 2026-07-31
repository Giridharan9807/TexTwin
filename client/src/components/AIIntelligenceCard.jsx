import React, { useState } from 'react';
import { Sparkles, Brain, ShieldAlert, CheckCircle2, ArrowRight, X, ChevronRight, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIGaugeRing = ({ percentage = 96, color = '#2563EB', size = 56, strokeWidth = 5.5, label }) => {
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

const AIIntelligenceCard = () => {
  const navigate = useNavigate();
  const [selectedAIItem, setSelectedAIItem] = useState(null);

  const aiItems = [
    {
      id: 'health',
      title: 'FLEET HEALTH SCORE',
      val: '96%',
      status: 'Optimal Operational Range',
      color: '#2563EB',
      pct: 96,
      detail: 'Overall machine health rating calculated by AI telemetry ensemble.',
      features: [
        { feature: 'Shaft Vibration Index (0.18 mm/s)', weight: '35% Impact', state: 'Normal' },
        { feature: 'Motor Temp Baseline (52.4°C)', weight: '30% Impact', state: 'Optimal' },
        { feature: 'Main Nozzle Air Pressure (6.2 bar)', weight: '20% Impact', state: 'Stable' },
        { feature: 'Warp Yarn Tension (18.2 cN)', weight: '15% Impact', state: 'Nominal' },
      ],
    },
    {
      id: 'failure',
      title: 'FAILURE PROBABILITY',
      val: '4.2%',
      status: 'Low Risk Threshold (< 15%)',
      color: '#16A34A',
      pct: 4.2,
      label: '4.2%',
      detail: 'Machine anomaly failure probability within next 30 days.',
      features: [
        { feature: 'LOOM-201 (Bearing Micro-Wear)', weight: '82% Failure Risk', state: 'High Risk' },
        { feature: 'LOOM-104 (Water Jet Nozzle Scale)', weight: '15% Failure Risk', state: 'Caution' },
        { feature: 'LOOM-501 (Drive Belt Tension)', weight: '8% Failure Risk', state: 'Low Risk' },
        { feature: 'Other 17 Looms Fleet Average', weight: '< 2% Failure Risk', state: 'Healthy' },
      ],
    },
    {
      id: 'rul',
      title: 'REMAINING USEFUL LIFE (RUL)',
      val: '842 Hours',
      status: 'Est. ~35 Days Run Time',
      color: '#7C3AED',
      pct: 84,
      label: '842h',
      detail: 'Estimated run hours remaining before scheduled component overhaul.',
      features: [
        { feature: 'LOOM-101 Main Shaft Bearing', weight: '1,200 Hours RUL', state: '50 Days' },
        { feature: 'LOOM-301 Rapier Flex Tape', weight: '950 Hours RUL', state: '39 Days' },
        { feature: 'LOOM-201 Motor Drive Shaft', weight: '34 Hours RUL', state: 'Action Needed' },
        { feature: 'Fleet Median RUL', weight: '842 Hours RUL', state: '~35 Days' },
      ],
    },
    {
      id: 'confidence',
      title: 'CONFIDENCE LEVEL',
      val: '99.4%',
      status: 'XGBoost & LSTM Ensemble',
      color: '#2563EB',
      pct: 99.4,
      detail: 'AI model confidence rating trained on 2.4M historical telemetry logs.',
      features: [
        { feature: 'XGBoost Classifier Model', weight: '99.6% Precision', state: 'Active' },
        { feature: 'LSTM Temporal Neural Net', weight: '99.2% Accuracy', state: 'Active' },
        { feature: 'Training Dataset Volume', weight: '2,450,000 Samples', state: 'Verified' },
        { feature: 'Cross-Validation F1 Score', weight: '0.988 F1 Rating', state: 'Grade A+' },
      ],
    },
  ];

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--accent-primary)' }} /> AI Predictive Intelligence & RUL Engine
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
            Predictive Machine Health, Failure Probabilities, and Automated Maintenance Diagnostics (Click any card to inspect AI models)
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/ai-intelligence')} style={{ fontWeight: '800' }}>
          Open AI Matrix <ArrowRight size={14} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.1rem', marginBottom: '1.25rem' }}>
        {aiItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedAIItem(item)}
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
            title="Click to inspect AI model prediction & feature importance"
          >
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#64748B' }}>{item.title}</div>
              <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>{item.val}</div>
              <div style={{ fontSize: '0.72rem', color: item.color, marginTop: '3px', fontWeight: '800' }}>{item.status}</div>
            </div>
            <AIGaugeRing percentage={item.pct} color={item.color} label={item.label} />
          </div>
        ))}
      </div>

      {/* AI Diagnostic Detail Banner */}
      <div style={{ padding: '1rem 1.25rem', background: 'rgba(8, 131, 149, 0.08)', borderRadius: '10px', border: '1px solid rgba(8, 131, 149, 0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>ROOT CAUSE ANALYSIS & DIAGNOSTICS</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
            LOOM-201 Drive Shaft Bearing Micro-Wear Identified
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: '600' }}>
            Recommended Action: Schedule preventive bearing overhaul within 48 hours to avert unplanned downtime.
          </div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/maintenance')}>
          <Wrench size={14} /> Dispatch Work Order
        </button>
      </div>

      {/* AI RUL & Model Matrix Inspector Modal */}
      {selectedAIItem && (
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
          onClick={() => setSelectedAIItem(null)}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '1.75rem',
              borderRadius: '14px',
              maxWidth: '680px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              border: `2px solid ${selectedAIItem.color}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <AIGaugeRing percentage={selectedAIItem.pct} color={selectedAIItem.color} label={selectedAIItem.label} size={48} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A' }}>{selectedAIItem.title} Model Matrix</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>{selectedAIItem.detail}</div>
                </div>
              </div>
              <button onClick={() => setSelectedAIItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '0.85rem 1.1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>
              🤖 AI Prediction Metric: <span style={{ color: selectedAIItem.color, fontSize: '1.1rem' }}>{selectedAIItem.val}</span> ({selectedAIItem.status})
            </div>

            <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#475569', marginBottom: '0.65rem' }}>FEATURE IMPORTANCE & COMPONENT PREDICTIONS:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {selectedAIItem.features.map((f, idx) => (
                <div key={idx} style={{ padding: '0.85rem 1.1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>{f.feature}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: '900', color: selectedAIItem.color }}>{f.weight}</div>
                    <span className="badge" style={{ background: `${selectedAIItem.color}15`, color: selectedAIItem.color, fontWeight: '800', fontSize: '0.7rem' }}>
                      {f.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedAIItem(null)}>
                Close
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => { setSelectedAIItem(null); navigate('/ai-intelligence'); }}>
                Open Full AI Intelligence Module <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIIntelligenceCard;
