import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../api/client';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import { AlertOctagon, AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ackLoadingId, setAckLoadingId] = useState(null);

  useEffect(() => {
    fetchActiveAlerts();
  }, []);

  const fetchActiveAlerts = async () => {
    try {
      setLoading(true);
      const res = await dashboardApi.getActiveAlerts();
      if (res && res.data && res.data.success) {
        setAlerts(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch active alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async (alertId) => {
    try {
      setAckLoadingId(alertId);
      await dashboardApi.acknowledgeAlert(alertId);
      setAlerts((prev) => prev.filter((a) => (a._id || a.id) !== alertId));
    } catch (err) {
      setAlerts((prev) => prev.filter((a) => (a._id || a.id) !== alertId));
    } finally {
      setAckLoadingId(null);
    }
  };

  const getAlertStyle = (severity) => {
    const sev = (severity || 'info').toLowerCase();
    switch (sev) {
      case 'critical':
        return { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B', icon: AlertOctagon, iconColor: '#EF4444' };
      case 'warning':
      case 'maintenance':
        return { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E', icon: AlertTriangle, iconColor: '#F59E0B' };
      case 'success':
        return { bg: '#DCFCE7', border: '#22C55E', text: '#166534', icon: CheckCircle2, iconColor: '#22C55E' };
      default:
        return { bg: '#DBEAFE', border: '#2563EB', text: '#1E3A8A', icon: Info, iconColor: '#2563EB' };
    }
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return 'Just now';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMins = Math.floor((now - date) / (1000 * 60));
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  if (loading) return <SkeletonCard height="280px" />;

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={18} style={{ color: '#EF4444' }} /> Active Telemetry Incident Warnings
          </h3>
          <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Real-Time Machinery Anomalies ({alerts.length} Unresolved)</span>
        </div>
      </div>

      {alerts.length === 0 ? (
        <EmptyState
          title="No Active Critical Incidents"
          message="All weaving loom sensors are operating within nominal thresholds."
          icon={CheckCircle2}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {alerts.map((alert) => {
            const id = alert._id || alert.id;
            const style = getAlertStyle(alert.severity);
            const Icon = style.icon;

            return (
              <div
                key={id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: style.bg,
                  border: `1.5px solid ${style.border}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Icon size={22} style={{ color: style.iconColor, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: style.text }}>
                      {alert.message}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '700' }}>
                      <span style={{ color: '#2563EB', fontWeight: '800', fontFamily: 'JetBrains Mono, monospace' }}>{alert.machineId || alert.machineName}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(alert.triggeredAt)}</span>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleAcknowledge(id)}
                  disabled={ackLoadingId === id}
                  style={{ whiteSpace: 'nowrap', fontWeight: '800', background: '#ffffff', borderColor: style.border, color: style.text }}
                >
                  {ackLoadingId === id ? 'Acking...' : 'Acknowledge'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;
