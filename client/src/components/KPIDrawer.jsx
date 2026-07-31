import React, { useState } from 'react';
import {
  X,
  Search,
  Server,
  PlayCircle,
  PauseCircle,
  Wrench,
  AlertTriangle,
  Eye,
  Activity,
  Gauge,
  Thermometer,
  Zap,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpDown,
} from 'lucide-react';

const KPIDrawer = ({ category, machines = [], onClose, onSelectMachine }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('health');

  if (!category) return null;

  // Filter machines based on selected KPI category
  let filtered = [...machines];
  if (category === 'running') {
    filtered = filtered.filter((m) => m.currentStatus === 'Running');
  } else if (category === 'idle') {
    filtered = filtered.filter((m) => m.currentStatus === 'Idle');
  } else if (category === 'maintenance') {
    filtered = filtered.filter((m) => m.currentStatus === 'Maintenance');
  } else if (category === 'critical') {
    filtered = filtered.filter((m) => m.assetCriticality === 'High');
  }

  // Search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.machineId.toLowerCase().includes(term) ||
        m.assetName.toLowerCase().includes(term) ||
        (m.factoryName || '').toLowerCase().includes(term)
    );
  }

  // Sorting
  if (sortBy === 'health') {
    filtered.sort((a, b) => (b.healthScore || 95) - (a.healthScore || 95));
  } else if (sortBy === 'name') {
    filtered.sort((a, b) => a.assetName.localeCompare(b.assetName));
  }

  const getHeaderInfo = () => {
    switch (category) {
      case 'total':
        return {
          title: 'Total Registered Machine Assets',
          icon: <Server size={24} style={{ color: 'var(--accent-primary)' }} />,
          badgeClass: 'badge-low',
          countLabel: `${filtered.length} Total Looms`,
        };
      case 'running':
        return {
          title: 'Running Machine Assets',
          icon: <PlayCircle size={24} style={{ color: 'var(--status-running)' }} />,
          badgeClass: 'badge-running',
          countLabel: `${filtered.length} Active Streams`,
        };
      case 'idle':
        return {
          title: 'Standby & Idle Assets',
          icon: <PauseCircle size={24} style={{ color: 'var(--status-idle)' }} />,
          badgeClass: 'badge-idle',
          countLabel: `${filtered.length} Idle Looms`,
        };
      case 'maintenance':
        return {
          title: 'Assets Under Maintenance',
          icon: <Wrench size={24} style={{ color: 'var(--status-maintenance)' }} />,
          badgeClass: 'badge-maintenance',
          countLabel: `${filtered.length} In Overhaul`,
        };
      case 'critical':
        return {
          title: 'High Criticality Loom Fleet',
          icon: <AlertTriangle size={24} style={{ color: 'var(--status-critical)' }} />,
          badgeClass: 'badge-high',
          countLabel: `${filtered.length} Mission Critical`,
        };
      default:
        return { title: 'Asset Fleet Details', icon: <Server size={24} />, badgeClass: 'badge', countLabel: '' };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            {headerInfo.icon}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 className="drawer-title">{headerInfo.title}</h2>
                <span className={`badge ${headerInfo.badgeClass}`}>{headerInfo.countLabel}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '2px' }}>
                Live Assets Table • Click Eye (👁️) to inspect 7-section details & record problem reasons
              </p>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', display: 'flex', gap: '0.75rem' }}>
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by Machine ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="health">Sort by Health Score</option>
            <option value="name">Sort by Asset Name</option>
          </select>
        </div>

        {/* Drawer Content Views */}
        <div className="drawer-body">
          {filtered.length === 0 ? (
            <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: '#0F172A', fontWeight: '800' }}>
              No machine assets found matching current filter context.
            </div>
          ) : (
            filtered.map((loom) => {
              const telemetry = loom.telemetry || {
                rpm: 980,
                temperature: '54.2',
                vibration: '1.45',
                energyUsage: '14.2',
                efficiency: '96.5%',
              };

              const idleInfo = loom.idleInfo || {
                idleDuration: '2 hrs 45 mins',
                reasonForIdle: 'Shift Change',
              };

              const maint = loom.maintenanceDetails || {
                maintenanceType: 'Motor Bearing Service',
                issueDescription: 'High drive vibration detected',
                engineer: loom.maintenanceEngineer || 'Anita Desai',
                priority: 'High',
              };

              const problemReason = loom.problemReason || 'Routine thermal and yarn friction variation';

              return (
                <div
                  key={loom._id || loom.machineId}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                  }}
                >
                  {/* Top Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#0F172A' }}>
                          {loom.assetName}
                        </span>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: '800', fontFamily: 'JetBrains Mono', fontSize: '0.88rem' }}>
                          ({loom.machineId})
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#334155', fontWeight: '700', marginTop: '2px' }}>
                        {loom.factoryName || 'TexTwin Primary Mill'} • {loom.productionLine || 'Line 1'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`badge badge-${(loom.currentStatus || 'Running').toLowerCase()}`}>
                        {loom.currentStatus}
                      </span>
                      <button
                        className="icon-btn"
                        title="Inspect Machine & Record Problem Reason"
                        onClick={() => onSelectMachine && onSelectMachine(loom)}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Highlighted Reason of Problem */}
                  <div style={{ background: 'rgba(79, 70, 229, 0.06)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-primary)', fontSize: '0.82rem' }}>
                    <span style={{ fontWeight: '800', color: '#0F172A', display: 'block', marginBottom: '2px' }}>
                      🔍 Reason for Problem / Diagnostic:
                    </span>
                    <span style={{ color: '#1E293B', fontWeight: '700' }}>{problemReason}</span>
                  </div>

                  {/* Tailored Category Metrics */}
                  {category === 'total' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: '700' }}>
                      <div>Type: <span style={{ color: '#0F172A', fontWeight: '800' }}>{loom.machineType}</span></div>
                      <div>Health Score: <span style={{ color: 'var(--status-running)', fontWeight: '800' }}>{loom.healthScore || 96}%</span></div>
                      <div>Engineer: <span style={{ color: '#0F172A', fontWeight: '800' }}>{loom.maintenanceEngineer || 'Anita Desai'}</span></div>
                    </div>
                  )}

                  {category === 'running' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', background: 'var(--status-running-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: '800' }}>
                      <div>RPM: <span style={{ color: '#0F172A' }}>{telemetry.rpm}</span></div>
                      <div>Temp: <span style={{ color: '#0F172A' }}>{telemetry.temperature}°C</span></div>
                      <div>Vib: <span style={{ color: '#0F172A' }}>{telemetry.vibration} mm/s</span></div>
                      <div>Efficiency: <span style={{ color: 'var(--status-running)' }}>{telemetry.efficiency}</span></div>
                    </div>
                  )}

                  {category === 'idle' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', background: 'var(--status-idle-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontWeight: '800' }}>
                      <div>Idle Duration: <span style={{ color: 'var(--status-idle)' }}>{idleInfo.idleDuration}</span></div>
                      <div>Reason: <span style={{ color: '#0F172A' }}>{idleInfo.reasonForIdle}</span></div>
                    </div>
                  )}

                  {category === 'maintenance' && (
                    <div style={{ background: 'var(--status-maintenance-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontWeight: '800' }}>
                      <div style={{ color: 'var(--status-maintenance)', fontWeight: '800' }}>Issue: {maint.issueDescription}</div>
                      <div style={{ color: '#0F172A', marginTop: '3px' }}>Engineer: {maint.engineer} • Priority: {maint.priority}</div>
                    </div>
                  )}

                  {category === 'critical' && (
                    <div style={{ background: 'var(--status-critical-bg)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontWeight: '800' }}>
                      <div style={{ color: 'var(--status-critical)', fontWeight: '800' }}>Health Score: {loom.healthScore || 68}% • High Failure Risk</div>
                      <div style={{ color: '#0F172A', marginTop: '3px' }}>Action: Inspect motor bearing and check drive belt tension</div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default KPIDrawer;
