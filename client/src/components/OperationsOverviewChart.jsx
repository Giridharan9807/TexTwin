import React, { useState } from 'react';
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
import { TrendingUp, Activity, Zap, Sparkles, ArrowRight, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const OperationsOverviewChart = () => {
  const navigate = useNavigate();
  const [activeMetric, setActiveMetric] = useState('speed');

  const timeLabels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];

  const metricConfigs = {
    speed: {
      label: 'Average Loom Speed (RPM)',
      data: [980, 1020, 1050, 1080, 1120, 1090, 1070, 1085, 1100],
      color: '#2563EB',
      gradientStart: 'rgba(37, 99, 235, 0.25)',
      gradientEnd: 'rgba(37, 99, 235, 0.01)',
      unit: ' RPM',
      target: '1,050 RPM Target',
      badge: 'Speed Index: 98%',
    },
    yield: {
      label: 'Fabric Production Yield (Meters / hr)',
      data: [1350, 1420, 1480, 1550, 1610, 1580, 1530, 1570, 1620],
      color: '#059669',
      gradientStart: 'rgba(5, 150, 105, 0.25)',
      gradientEnd: 'rgba(5, 150, 105, 0.01)',
      unit: ' m/hr',
      target: '1,500 m/hr Target',
      badge: '+12.4% Yield Growth',
    },
    energy: {
      label: 'Specific Energy Consumption Rate (kWh / 100m)',
      data: [4.5, 4.3, 4.1, 4.0, 3.8, 3.9, 4.1, 4.0, 3.7],
      color: '#7C3AED',
      gradientStart: 'rgba(124, 58, 237, 0.25)',
      gradientEnd: 'rgba(124, 58, 237, 0.01)',
      unit: ' kWh',
      target: '4.2 kWh Target (Eco Grade A+)',
      badge: 'Eco Rating: A+',
    },
  };

  const currentConfig = metricConfigs[activeMetric];

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        fill: true,
        label: currentConfig.label,
        data: currentConfig.data,
        borderColor: currentConfig.color,
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: currentConfig.color,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return currentConfig.gradientStart;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, currentConfig.gradientStart);
          gradient.addColorStop(1, currentConfig.gradientEnd);
          return gradient;
        },
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
        borderColor: currentConfig.color,
        borderWidth: 1.5,
        padding: 10,
        callbacks: {
          label: (context) => ` ${currentConfig.label}: ${context.raw}${currentConfig.unit}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748B', font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' } },
      },
      y: {
        grid: { color: '#F1F5F9' },
        ticks: { color: '#64748B', font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' } },
      },
    },
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.5rem',
        marginBottom: '1.75rem',
        background: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}
    >
      {/* Header Bar with Action Buttons */}
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            }}
          >
            <TrendingUp size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Factory Operations Real-Time Telemetry Graph
              <span className="badge badge-running" style={{ fontWeight: '800', fontSize: '0.72rem' }}>
                <Radio size={12} className="dot" /> Live Telemetry
              </span>
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>
              Real-time trend mirroring speed index, weaving meters output, and energy rating across 20 registered looms
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/what-if')} style={{ fontWeight: '800' }}>
            <Sparkles size={15} style={{ color: '#2563EB' }} /> What-If AI Simulator
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/assets')} style={{ fontWeight: '800' }}>
            View Asset Inventory <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1rem',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setActiveMetric('speed')}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: '8px',
            border: activeMetric === 'speed' ? '2px solid #2563EB' : '1px solid #CBD5E1',
            background: activeMetric === 'speed' ? '#EFF6FF' : '#ffffff',
            color: activeMetric === 'speed' ? '#2563EB' : '#475569',
            fontWeight: '800',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.2s ease',
          }}
        >
          <Activity size={15} /> Loom Speed (RPM)
        </button>

        <button
          onClick={() => setActiveMetric('yield')}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: '8px',
            border: activeMetric === 'yield' ? '2px solid #059669' : '1px solid #CBD5E1',
            background: activeMetric === 'yield' ? '#ECFDF5' : '#ffffff',
            color: activeMetric === 'yield' ? '#059669' : '#475569',
            fontWeight: '800',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.2s ease',
          }}
        >
          <TrendingUp size={15} /> Fabric Output (m/hr)
        </button>

        <button
          onClick={() => setActiveMetric('energy')}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: '8px',
            border: activeMetric === 'energy' ? '2px solid #7C3AED' : '1px solid #CBD5E1',
            background: activeMetric === 'energy' ? '#F3E8FF' : '#ffffff',
            color: activeMetric === 'energy' ? '#7C3AED' : '#475569',
            fontWeight: '800',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.2s ease',
          }}
        >
          <Zap size={15} /> Energy Rate (kWh)
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: '800', color: currentConfig.color, background: currentConfig.gradientStart, padding: '0.3rem 0.65rem', borderRadius: '6px' }}>
            {currentConfig.badge}
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B' }}>
            {currentConfig.target}
          </span>
        </div>
      </div>

      {/* Main Chart Canvas */}
      <div style={{ height: '220px', width: '100%' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OperationsOverviewChart;
