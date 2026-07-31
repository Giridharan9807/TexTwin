import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../api/client';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import { Wrench, Calendar } from 'lucide-react';

const UpcomingMaintenanceTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingMaintenance();
  }, []);

  const fetchUpcomingMaintenance = async () => {
    try {
      setLoading(true);
      const res = await dashboardApi.getUpcomingMaintenance();
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch upcoming maintenance:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysRemaining = (scheduledDateStr) => {
    if (!scheduledDateStr) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(scheduledDateStr);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  };

  const getDaysBadge = (days) => {
    if (days <= 3) {
      return (
        <span className="badge badge-maintenance">
          {days === 0 ? 'Due Today' : `${days} Day${days > 1 ? 's' : ''}`}
        </span>
      );
    } else if (days <= 7) {
      return (
        <span className="badge badge-idle">
          {days} Days
        </span>
      );
    } else {
      return (
        <span className="badge badge-running">
          {days} Days
        </span>
      );
    }
  };

  if (loading) return <SkeletonCard height="280px" />;

  // Sort by soonest due date
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
  );

  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wrench size={18} style={{ color: 'var(--status-maintenance)' }} /> Upcoming Scheduled Maintenance
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Prioritized by Soonest Service Due Date</span>
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <EmptyState
          title="No Maintenance Scheduled"
          message="No maintenance scheduled this week."
          icon={Calendar}
        />
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Machine ID</th>
                <th>Asset Name</th>
                <th>Maintenance Type</th>
                <th>Scheduled Date</th>
                <th>Days Remaining</th>
                <th>Assigned Engineer</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item) => {
                const daysLeft = calculateDaysRemaining(item.scheduledDate);
                return (
                  <tr key={item._id || item.machineId}>
                    <td style={{ fontWeight: '700', color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                      {item.machineId}
                    </td>
                    <td style={{ fontWeight: '600' }}>{item.assetName}</td>
                    <td>{item.type || 'Preventative Inspection'}</td>
                    <td>{new Date(item.scheduledDate).toLocaleDateString()}</td>
                    <td>{getDaysBadge(daysLeft)}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{item.engineer || 'Unassigned'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpcomingMaintenanceTable;
