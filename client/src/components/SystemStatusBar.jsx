import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../api/client';
import {
  PlayCircle,
  PauseCircle,
  Wrench,
  AlertTriangle,
  Gauge,
  Award,
  Zap,
  TrendingUp,
  X,
  CheckCircle2,
  Clock,
  UserCheck,
  ExternalLink,
  ChevronDown,
  Layers,
  Activity,
  ShieldAlert,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SystemStatusBar = () => {
  const navigate = useNavigate();
  const [selectedKpi, setSelectedKpi] = useState('running');
  const [kpiDetails, setKpiDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const kpis = [
    {
      key: 'running',
      title: 'Running Machines',
      value: '16 / 20',
      status: '90% Operational',
      icon: PlayCircle,
      color: '#16A34A',
      bg: '#DCFCE7',
      borderColor: '#BBF7D0',
      route: '/assets',
      tooltip: 'Active weaving looms currently producing fabric on the factory floor',
    },
    {
      key: 'idle',
      title: 'Idle Machines',
      value: '2',
      status: 'Standby',
      icon: PauseCircle,
      color: '#D97706',
      bg: '#FEF3C7',
      borderColor: '#FDE68A',
      route: '/assets',
      tooltip: 'Weaving looms powered on but currently paused or waiting for yarn batch',
    },
    {
      key: 'maintenance',
      title: 'Scheduled Maintenance',
      value: '2',
      status: 'Scheduled Service',
      icon: Wrench,
      color: '#EA580C',
      bg: '#FFEDD5',
      borderColor: '#FED7AA',
      route: '/maintenance',
      tooltip: 'Looms undergoing preventive maintenance or component checks',
    },
    {
      key: 'alerts',
      title: 'Critical Alerts',
      value: '3',
      status: 'Immediate Action Required',
      icon: AlertTriangle,
      color: '#DC2626',
      bg: '#FEE2E2',
      borderColor: '#FECACA',
      route: '/alerts',
      tooltip: 'Active sensor warnings requiring immediate operator intervention',
    },
    {
      key: 'production',
      title: "Today's Production",
      value: '14,250 m',
      status: 'Target 16,000 m (89%)',
      icon: Gauge,
      color: '#2563EB',
      bg: '#DBEAFE',
      borderColor: '#BFDBFE',
      route: '/analytics',
      tooltip: 'Total meters of fabric woven today across all active production lines',
    },
    {
      key: 'oee',
      title: 'Overall Equipment Effectiveness (OEE)',
      value: '96.4%',
      status: 'World Class',
      icon: Award,
      color: '#7C3AED',
      bg: '#F3E8FF',
      borderColor: '#DDD6FE',
      route: '/ai-intelligence',
      tooltip: 'Manufacturing productivity score (Availability × Operating Speed × Fabric Quality)',
    },
    {
      key: 'energy',
      title: 'Energy Consumption',
      value: '1,245 kWh',
      status: 'Optimal Consumption',
      icon: Zap,
      color: '#059669',
      bg: '#ECFDF5',
      borderColor: '#A7F3D0',
      route: '/sensors',
      tooltip: 'Total power consumed by weaving looms and compressors today',
    },
  ];

  useEffect(() => {
    fetchDetails(selectedKpi);
  }, [selectedKpi]);

  const fetchDetails = async (key) => {
    try {
      setLoading(true);
      const res = await dashboardApi.getKpiDetails(key);
      if (res && res.data && res.data.success) {
        setKpiDetails(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch KPI details:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeObj = kpis.find((k) => k.key === selectedKpi) || kpis[0];
  const Icon = activeObj.icon;

  return (
    <section style={{ width: '100%', marginBottom: '2rem' }}>
      
      {/* 1. Full-Width Enterprise KPI Dashboard Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          marginBottom: '1.5rem',
        }}
      >
        {kpis.map((kpi) => {
          const CardIcon = kpi.icon;
          const isSelected = selectedKpi === kpi.key;

          return (
            <div
              key={kpi.key}
              onClick={() => setSelectedKpi(kpi.key)}
              style={{
                background: isSelected ? `${kpi.bg}` : '#ffffff',
                borderRadius: '14px',
                padding: '1.5rem 1.75rem',
                border: isSelected ? `2.5px solid ${kpi.color}` : `1px solid ${kpi.borderColor}`,
                boxShadow: isSelected ? '0 8px 25px rgba(0,0,0,0.08)' : '0 4px 18px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                minHeight: '145px',
                cursor: 'pointer',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.03)';
                }
              }}
            >
              {/* Header: Title & Icon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }} title={kpi.tooltip}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: '800', color: '#475569', lineHeight: '1.3' }}>
                    {kpi.title}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: '600', marginTop: '2px' }}>
                    {kpi.tooltip}
                  </span>
                </div>

                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: kpi.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: kpi.color,
                    flexShrink: 0,
                  }}
                >
                  <CardIcon size={22} />
                </div>
              </div>

              {/* Body: Large Value & Status Line */}
              <div style={{ marginTop: '1.25rem' }}>
                <div
                  style={{
                    fontSize: '2.1rem',
                    fontWeight: '900',
                    color: '#0F172A',
                    lineHeight: '1.1',
                    letterSpacing: '-0.5px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  {kpi.value}
                </div>

                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    color: kpi.color,
                    marginTop: '0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <TrendingUp size={13} /> {kpi.status}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: isSelected ? kpi.color : '#2563EB', fontWeight: '800' }}>
                    {isSelected ? '● Active View' : 'Click Details →'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. INLINE EXPANDED DETAILS SECTION FOR SELECTED KPI */}
      <div
        className="glass-card"
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '1.75rem',
          border: `2px solid ${activeObj.color}`,
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: activeObj.bg, color: activeObj.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A' }}>
                {activeObj.title} — Detailed Breakdown
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>
                Live Industrial Telemetry & Express API Endpoint Data
              </span>
            </div>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(activeObj.route)}
            style={{ fontWeight: '800', background: '#ffffff', borderColor: activeObj.color, color: activeObj.color }}
          >
            Open Full Module <ExternalLink size={14} />
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#2563EB', fontWeight: '800' }}>
            Loading Telemetry Details...
          </div>
        ) : kpiDetails ? (
          <div>
            <div style={{ padding: '0.85rem 1.1rem', background: activeObj.bg, borderRadius: '8px', border: `1px solid ${activeObj.borderColor}`, marginBottom: '1.25rem', fontSize: '0.88rem', color: '#0F172A', fontWeight: '800' }}>
              ℹ️ {kpiDetails.summary}
            </div>

            {/* Registered Loom Fleet Status (for Running & Idle) */}
            {kpiDetails.machines && (
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#475569', marginBottom: '0.65rem' }}>REGISTERED WEAVING LOOM TELEMETRY:</div>
                <div className="table-responsive">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Machine ID</th>
                        <th>Name & Model</th>
                        <th>Speed (RPM)</th>
                        <th>Temperature</th>
                        <th>Operator</th>
                        <th>Operational Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kpiDetails.machines.map((m) => (
                        <tr key={m.id}>
                          <td style={{ fontWeight: '900', color: '#2563EB', fontFamily: 'JetBrains Mono' }}>{m.id}</td>
                          <td style={{ fontWeight: '800' }}>{m.name}</td>
                          <td style={{ fontWeight: '800' }}>{m.rpm ? `${m.rpm} RPM` : '-'}</td>
                          <td style={{ fontWeight: '800', color: m.temp && parseInt(m.temp) > 75 ? '#EF4444' : '#22C55E' }}>{m.temp || '-'}</td>
                          <td style={{ fontWeight: '700' }}>{m.operator || 'Unassigned'}</td>
                          <td>
                            <span className="badge" style={{ background: m.status === 'Running' ? '#DCFCE7' : '#FEF3C7', color: m.status === 'Running' ? '#166534' : '#92400E', fontWeight: '800' }}>
                              {m.status || m.reason || 'Active'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Scheduled Maintenance Work Orders */}
            {kpiDetails.workOrders && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#475569' }}>ACTIVE WORK ORDERS & PREVENTIVE MAINTENANCE:</div>
                {kpiDetails.workOrders.map((wo) => (
                  <div key={wo._id} style={{ padding: '1rem', background: '#FFEDD5', border: '1px solid #FED7AA', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '900', color: '#EA580C' }}>{wo.workOrder} — {wo.assetName} ({wo.machineId})</div>
                      <div style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: '800', marginTop: '3px' }}>{wo.type}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', marginTop: '4px' }}>Assigned Engineer: {wo.engineer}</div>
                    </div>
                    <span className="badge" style={{ background: '#EA580C', color: '#ffffff', fontWeight: '800' }}>{wo.status}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Anomaly Alerts List */}
            {kpiDetails.alerts && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#475569' }}>ACTIVE CRITICAL ANOMALY ALERTS:</div>
                {kpiDetails.alerts.map((alt) => (
                  <div key={alt._id} style={{ padding: '1rem', background: '#FEE2E2', border: '1.5px solid #FECACA', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '900', color: '#DC2626' }}>{alt.message}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', marginTop: '3px' }}>Target Loom: {alt.machineId} ({alt.machineName})</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate('/alerts')} style={{ background: '#DC2626', borderColor: '#DC2626', fontWeight: '800' }}>
                      Dispatch Tech Order
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Shift Breakdown (for Production) */}
            {kpiDetails.shifts && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#475569' }}>SHIFT YIELD & EFFICIENCY:</div>
                {kpiDetails.shifts.map((s, idx) => (
                  <div key={idx} style={{ padding: '0.85rem 1.1rem', background: '#DBEAFE', border: '1px solid #BFDBFE', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem' }}>
                    <div><strong style={{ color: '#0F172A' }}>{s.shift}</strong>: {s.meters.toLocaleString()} meters woven (Target: {s.target.toLocaleString()} m)</div>
                    <span className="badge" style={{ background: '#2563EB', color: '#ffffff', fontWeight: '800' }}>{s.status}</span>
                  </div>
                ))}
              </div>
            )}

            {/* OEE Component Metrics */}
            {kpiDetails.metrics && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.1rem', background: '#F3E8FF', borderRadius: '10px', border: '1px solid #DDD6FE', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800' }}>AVAILABILITY</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#7C3AED', marginTop: '4px' }}>{kpiDetails.metrics.availability}</div>
                </div>
                <div style={{ padding: '1.1rem', background: '#F3E8FF', borderRadius: '10px', border: '1px solid #DDD6FE', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800' }}>PERFORMANCE</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#7C3AED', marginTop: '4px' }}>{kpiDetails.metrics.performance}</div>
                </div>
                <div style={{ padding: '1.1rem', background: '#F3E8FF', borderRadius: '10px', border: '1px solid #DDD6FE', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '800' }}>QUALITY RATE</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#7C3AED', marginTop: '4px' }}>{kpiDetails.metrics.quality}</div>
                </div>
              </div>
            )}

            {/* Energy Stats */}
            {kpiDetails.powerFactor && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: '#ECFDF5', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: '800' }}>POWER FACTOR</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#059669', marginTop: '2px' }}>{kpiDetails.powerFactor}</div>
                </div>
                <div style={{ padding: '1rem', background: '#ECFDF5', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: '800' }}>PEAK DEMAND</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#059669', marginTop: '2px' }}>{kpiDetails.peakDemandKw}</div>
                </div>
                <div style={{ padding: '1rem', background: '#ECFDF5', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: '800' }}>CARBON SAVINGS</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#059669', marginTop: '2px' }}>{kpiDetails.co2SavedKg}</div>
                </div>
                <div style={{ padding: '1rem', background: '#ECFDF5', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: '800' }}>ESTIMATED COST</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#059669', marginTop: '2px' }}>{kpiDetails.dailyCostEstINR}</div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default SystemStatusBar;
