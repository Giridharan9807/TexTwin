import React from 'react';
import { Factory, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FactoryOverviewCard = () => {
  const navigate = useNavigate();

  const plants = [
    { name: 'Plant A – Gujarat Heavy Weaving Hub', status: 'Running', looms: 8, efficiency: '97.2%', badge: 'running' },
    { name: 'Plant B – Coimbatore Air Jet Line', status: 'Running', looms: 5, efficiency: '98.5%', badge: 'running' },
    { name: 'Plant C – Salem Eco-Cotton Hub', status: 'Maintenance', looms: 3, efficiency: '78.4%', badge: 'maintenance' },
    { name: 'Plant D – Madurai Denim Line', status: 'Running', looms: 2, efficiency: '96.1%', badge: 'running' },
    { name: 'Plant E – Tirupur Technical Line', status: 'Idle', looms: 1, efficiency: '85.0%', badge: 'idle' },
    { name: 'Plant F – Erode Jacquard Line', status: 'Running', looms: 1, efficiency: '94.8%', badge: 'running' },
  ];

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Factory size={20} style={{ color: 'var(--accent-primary)' }} /> Factory Overview & Production Line Allocations
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
            Operational Status and Machine Counts Across All 6 Regional Plants
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/plants')}>
          View Plant Map <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.1rem' }}>
        {plants.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-primary)',
              borderRadius: '8px',
              padding: '1rem',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-primary)' }}>{p.name}</div>
              <span className={`badge badge-${p.badge}`} style={{ fontSize: '0.68rem', flexShrink: 0 }}>{p.status}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Active Looms: <strong style={{ color: 'var(--text-primary)' }}>{p.looms} Machines</strong></span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: '800' }}>{p.efficiency} OEE</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactoryOverviewCard;
