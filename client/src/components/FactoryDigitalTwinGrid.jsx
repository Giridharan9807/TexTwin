import React, { useState } from 'react';
import { Cpu, Thermometer, Gauge, Activity, Clock, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FactoryDigitalTwinGrid = ({ machines = [], onSelectMachine }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Fallback machine inventory if empty
  const defaultMachines = [
    { machineId: 'LOOM-101', name: 'Toyota Air Jet Alpha', currentStatus: 'RUNNING', healthScore: 96, temperature: 52.4, rpm: 1080, lastUpdated: '1s ago' },
    { machineId: 'LOOM-201', name: 'Dornier Heavy Shuttleless', currentStatus: 'MAINTENANCE', healthScore: 68, temperature: 76.8, rpm: 920, lastUpdated: 'Just now' },
    { machineId: 'LOOM-301', name: 'Itema A9500 Denim', currentStatus: 'RUNNING', healthScore: 98, temperature: 48.9, rpm: 1120, lastUpdated: '2s ago' },
    { machineId: 'LOOM-401', name: 'Tsudakoma Water Jet', currentStatus: 'IDLE', healthScore: 88, temperature: 58.1, rpm: 0, lastUpdated: '5s ago' },
    { machineId: 'LOOM-501', name: 'Picanol OmniPlus i', currentStatus: 'RUNNING', healthScore: 72, temperature: 64.2, rpm: 1040, lastUpdated: '1s ago' },
    { machineId: 'LOOM-601', name: 'Somet SuperExcel Rapier', currentStatus: 'RUNNING', healthScore: 94, temperature: 51.0, rpm: 1060, lastUpdated: '3s ago' },
  ];

  const displayMachines = machines.length > 0 ? machines : defaultMachines;
  const INITIAL_COUNT = 6;
  const visibleMachines = showAll ? displayMachines : displayMachines.slice(0, INITIAL_COUNT);
  const remainingCount = Math.max(0, displayMachines.length - INITIAL_COUNT);

  const getStatusColor = (status) => {
    const s = (status || '').toUpperCase();
    if (s === 'RUNNING') return { bg: 'rgba(16, 185, 129, 0.12)', border: '#10b981', dot: '#10b981', text: 'RUNNING' };
    if (s === 'IDLE') return { bg: 'rgba(245, 158, 11, 0.12)', border: '#f59e0b', dot: '#f59e0b', text: 'IDLE' };
    return { bg: 'rgba(244, 63, 94, 0.12)', border: '#f43f5e', dot: '#f43f5e', text: 'FAULT / MAINT' };
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} style={{ color: 'var(--accent-primary)' }} /> Factory Digital Twin Live Layout
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
            Real-Time State Mirroring & Sensor Telemetry Matrix for Air Jet Weaving Looms ({displayMachines.length} Total Registered)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', fontWeight: '800' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981' }} title="Machine is active and weaving fabric normally">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} /> 🟢 Running (Active Weaving)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b' }} title="Machine is powered on but paused or waiting for yarn">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} /> 🟡 Standby (Idle)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f43f5e' }} title="Machine is undergoing maintenance or error service">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }} /> 🔴 Maintenance (Service Needed)
          </span>
        </div>
      </div>

      {/* Grid of Machine Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.1rem' }}>
        {visibleMachines.map((m) => {
          const st = getStatusColor(m.currentStatus);
          return (
            <div
              key={m.machineId || m.id || m._id}
              onClick={() => {
                if (onSelectMachine) {
                  onSelectMachine(m);
                } else {
                  navigate('/digital-twin', { state: { machineId: m.machineId || m.id } });
                }
              }}
              style={{
                background: '#F8FAFC',
                borderRadius: '10px',
                padding: '1.1rem',
                border: `1px solid ${st.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(8, 131, 149, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
              }}
            >
              {/* Card Top Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.76rem', color: '#2563EB', fontWeight: '800', fontFamily: 'JetBrains Mono' }}>
                    {m.machineId}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                    {m.name || m.assetName}
                  </div>
                </div>

                <div
                  style={{
                    background: st.bg,
                    color: st.dot,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: st.dot,
                      boxShadow: `0 0 6px ${st.dot}`,
                    }}
                  />
                  {st.text}
                </div>
              </div>

              {/* Card Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', margin: '0.75rem 0', padding: '0.65rem 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700' }}>HEALTH</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '900', color: m.healthScore < 75 ? '#EF4444' : '#2563EB' }}>
                    {m.healthScore || 96}%
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700' }}>TEMP</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '900', color: (m.temperature || 52) > 70 ? '#EF4444' : '#0F172A' }}>
                    {m.temperature || 52.4}°C
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700' }}>SPEED</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#0F172A' }}>
                    {m.rpm || 1080} <span style={{ fontSize: '0.68rem' }}>RPM</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#64748B' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={11} /> {m.lastUpdated || '1s ago'}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/digital-twin', { state: { machineId: m.machineId || m.id } });
                  }}
                  style={{ color: '#2563EB', fontWeight: '800', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  title="View 3D Digital Twin Model"
                >
                  View 3D Twin <ChevronRight size={12} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* See More / Show Less Action Bar */}
      {displayMachines.length > INITIAL_COUNT && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '8px',
              border: '1.5px solid #2563EB',
              background: '#EFF6FF',
              color: '#2563EB',
              fontWeight: '800',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.12)',
            }}
          >
            {showAll ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                See More Looms (+{remainingCount} More Machines) <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FactoryDigitalTwinGrid;
