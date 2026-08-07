import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../api/client';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import { Layers } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductionChart = () => {
  const [productionData, setProductionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductionData();
  }, []);

  const fetchProductionData = async () => {
    try {
      setLoading(true);
      const res = await dashboardApi.getProduction();
      if (res.data.success) {
        setProductionData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch production data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <SkeletonCard height="300px" />;
  if (!productionData || productionData.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Daily Production Output
        </h3>
        <EmptyState title="No Production Data" message="Unable to load 7-day production output." />
      </div>
    );
  }

  const dates = Array.from(new Set(productionData.map((item) => item.date)));
  const line1Output = dates.map((d) => {
    const found = productionData.find((item) => item.date === d && item.line.includes('Line 1'));
    return found ? found.output : 1250;
  });
  const line2Output = dates.map((d) => {
    const found = productionData.find((item) => item.date === d && item.line.includes('Line 2'));
    return found ? found.output : 980;
  });

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Line 1 - Speedy Gonzalez Shuttle Express 🚀',
        data: line1Output,
        backgroundColor: '#059669',
        borderRadius: 4,
      },
      {
        label: 'Line 2 - The Yarn Twister Rollercoaster 🎢',
        data: line2Output,
        backgroundColor: '#34D399',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: '#334155',
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' },
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#FFFFFF',
        bodyColor: '#E2E8F0',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#334155', font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' } },
      },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.8)', drawBorder: false },
        ticks: { color: '#334155', font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' } },
      },
    },
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} style={{ color: 'var(--status-running)' }} /> Daily Production Output
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700' }}>Fabric Output (Meters) per Production Line</span>
        </div>
      </div>
      <div style={{ height: '220px', width: '100%' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ProductionChart;
