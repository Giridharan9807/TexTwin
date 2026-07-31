import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../api/client';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import { Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HealthTrendChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthTrend();
  }, []);

  const fetchHealthTrend = async () => {
    try {
      setLoading(true);
      const res = await dashboardApi.getHealthTrend();
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch health trend:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <SkeletonCard height="300px" />;
  if (!data || data.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Machine Health Trend
        </h3>
        <EmptyState title="No Health Trend Data" message="Unable to load 7-day health trend." />
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Fleet Health Score (0-100)',
        data: data.map((d) => d.avgHealthScore),
        borderColor: '#4F46E5',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4F46E5',
        pointBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 240);
          gradient.addColorStop(0, 'rgba(79, 70, 229, 0.28)');
          gradient.addColorStop(1, 'rgba(79, 70, 229, 0.02)');
          return gradient;
        },
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#FFFFFF',
        bodyColor: '#E2E8F0',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(226, 232, 240, 0.6)', drawBorder: false },
        ticks: { color: '#475569', font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' } },
      },
      y: {
        min: 60,
        max: 100,
        grid: { color: 'rgba(226, 232, 240, 0.8)', drawBorder: false },
        ticks: { color: '#475569', font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' }, stepSize: 10 },
      },
    },
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} style={{ color: 'var(--accent-primary)' }} /> Machine Health Trend
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700' }}>7-Day Average Fleet Health Score Tracking</span>
          </div>
          <span className="badge badge-running" style={{ fontWeight: '800' }}>Grade A+ Stable</span>
        </div>

        <div style={{ height: '240px', width: '100%' }}>
          <Line data={chartData} options={options} />
        </div>

        {/* Fleet Health Distribution Progress Bar filling middle space */}
        <div style={{ marginTop: '0.85rem', padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontWeight: '800', color: '#475569', marginBottom: '0.35rem' }}>
            <span>FLEET HEALTH DISTRIBUTION (20 LOOMS)</span>
            <span style={{ color: '#16A34A' }}>90% Optimal</span>
          </div>
          <div style={{ height: '8px', width: '100%', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: '90%', background: '#16A34A' }} title="18 Looms Grade A (>90%)" />
            <div style={{ width: '10%', background: '#F59E0B' }} title="2 Looms Grade B (80-90%)" />
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '700', marginTop: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>🟢 18 Grade A (&gt;90%)</span>
            <span>🟡 2 Grade B (80-90%)</span>
            <span>🔴 0 Critical (&lt;75%)</span>
          </div>
        </div>
      </div>

      {/* Summary Stats Footer Bar */}
      <div
        style={{
          marginTop: '0.85rem',
          padding: '0.75rem 1rem',
          background: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '800' }}>AVG HEALTH</div>
          <div style={{ fontSize: '1rem', fontWeight: '900', color: '#2563EB', marginTop: '1px' }}>96.4%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '800' }}>7-DAY PEAK</div>
          <div style={{ fontSize: '1rem', fontWeight: '900', color: '#16A34A', marginTop: '1px' }}>99.1%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '800' }}>RELIABILITY</div>
          <div style={{ fontSize: '1rem', fontWeight: '900', color: '#059669', marginTop: '1px' }}>99.8%</div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrendChart;
