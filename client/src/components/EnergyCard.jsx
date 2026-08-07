import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../api/client';
import SkeletonCard from './SkeletonCard';
import { Zap } from 'lucide-react';

const EnergyCard = () => {
  const [energyData, setEnergyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnergy();
  }, []);

  const fetchEnergy = async () => {
    try {
      setLoading(true);
      const res = await dashboardApi.getEnergy();
      if (res.data.success) {
        setEnergyData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch energy metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <SkeletonCard height="130px" />;

  const todayKwh = energyData?.todayKwh || 1485.4;
  const trend = energyData?.hourlyTrend || [45, 52, 60, 64, 58, 62, 70, 75, 82, 88, 85, 79, 81, 84, 86, 90, 88, 76, 65, 50, 48, 44, 42, 40];

  // SVG Sparkline calculation
  const maxVal = Math.max(...trend, 1);
  const minVal = Math.min(...trend, 0);
  const width = 160;
  const height = 40;
  const points = trend
    .map((val, idx) => {
      const x = (idx / (trend.length - 1)) * width;
      const y = height - ((val - minVal) / (maxVal - minVal || 1)) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="glass-card dashboard-card">
      <div className="card-info">
        <span className="card-title">Today's Energy Consumption</span>
        <div className="card-value">
          {todayKwh.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>kWh</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
          <span className="card-subtitle">24-Hour Power Load Sparkline</span>
          {/* Inline SVG Sparkline */}
          <svg width={width} height={height} style={{ overflow: 'visible' }}>
            <polyline
              fill="none"
              stroke="#6366F1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      <div
        className="card-icon-container"
        style={{
          background: 'rgba(99, 102, 241, 0.15)',
          color: '#6366F1',
          border: '1px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <Zap size={24} />
      </div>
    </div>
  );
};

export default EnergyCard;
