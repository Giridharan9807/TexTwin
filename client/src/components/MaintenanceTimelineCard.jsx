import React from 'react';
import { Calendar, Clock, CheckCircle2, AlertTriangle, UserCheck, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MaintenanceTimelineCard = () => {
  const navigate = useNavigate();

  const maintenanceItems = [
    { type: "Today's Maintenance", machine: 'LOOM-201', task: 'Drive Shaft Bearing Overhaul', engineer: 'Anita Desai', status: 'In Progress', badge: 'maintenance' },
    { type: 'Upcoming Maintenance', machine: 'LOOM-104', task: 'Nozzle Calibration & Filter Clean', engineer: 'Karthik N', status: 'Scheduled in 3 days', badge: 'idle' },
    { type: 'Completed Maintenance', machine: 'LOOM-301', task: 'Heald Frame & Tension Check', engineer: 'Rajesh Kumar', status: 'Completed Yesterday', badge: 'running' },
    { type: 'Delayed Maintenance', machine: 'LOOM-601', task: 'Shedding Motion Lubrication', engineer: 'Suresh Mehta', status: 'Rescheduled', badge: 'idle' },
  ];

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} style={{ color: 'var(--accent-primary)' }} /> Maintenance Timeline & Work Orders
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
            Preventive Work Order Schedules and Assigned Maintenance Engineers
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/maintenance')}>
          View Full Timeline
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.1rem' }}>
        {maintenanceItems.map((item, idx) => (
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
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className={`badge badge-${item.badge}`} style={{ fontSize: '0.68rem' }}>{item.type}</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono', fontWeight: '800', color: 'var(--accent-primary)' }}>{item.machine}</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
                {item.task}
              </div>
            </div>

            <div style={{ marginTop: '0.85rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
                <UserCheck size={12} style={{ color: 'var(--accent-primary)' }} /> {item.engineer}
              </span>
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceTimelineCard;
