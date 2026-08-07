import React, { useState, useEffect } from 'react';
import { Radio, Activity, Thermometer, Zap, Gauge, ArrowUpRight, ArrowDownRight, RefreshCw, Cpu, ShieldCheck } from 'lucide-react';

const LiveTelemetryWidget = () => {
  const [telemetryFeeds, setTelemetryFeeds] = useState([
    { id: 'LOOM-101', name: 'Toyota Air Jet Alpha', plant: 'Coimbatore Hub', rpm: 1080, temp: 52.4, tension: 18.2, vibration: 0.18, power: 14.2, status: 'Optimal' },
    { id: 'LOOM-201', name: 'Dornier Shuttleless', plant: 'Gujarat Hub', rpm: 920, temp: 76.8, tension: 24.8, vibration: 0.42, power: 18.6, status: 'Warning' },
    { id: 'LOOM-301', name: 'Itema A9500 Denim', plant: 'Gujarat Hub', rpm: 1120, temp: 48.9, tension: 16.5, vibration: 0.15, power: 15.1, status: 'Optimal' },
    { id: 'LOOM-501', name: 'Picanol OmniPlus i', plant: 'Salem Eco-Cotton', rpm: 1040, temp: 64.2, tension: 21.0, vibration: 0.28, power: 16.4, status: 'Attention' },
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Simulate subtle real-time IoT sensor telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryFeeds((prev) =>
        prev.map((feed) => {
          const rpmDelta = Math.floor(Math.random() * 9) - 4;
          const tempDelta = Number((Math.random() * 0.4 - 0.2).toFixed(1));
          const tensionDelta = Number((Math.random() * 0.3 - 0.15).toFixed(1));
          return {
            ...feed,
            rpm: Math.max(800, feed.rpm + rpmDelta),
            temp: Number(Math.max(40, feed.temp + tempDelta).toFixed(1)),
            tension: Number(Math.max(12, feed.tension + tensionDelta).toFixed(1)),
          };
        })
      );
      setLastUpdated(new Date().toLocaleTimeString());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Radio size={20} style={{ color: 'var(--status-running)' }} className="dot" /> Real-Time IoT Sensor Telemetry Feeds
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700' }}>
            Live High-Frequency Sensor Stream (200ms Telemetry Resolution) Across Active Weaving Looms
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <RefreshCw size={13} className="spin" /> Streamed: {lastUpdated}
          </span>
          <span className="badge badge-running" style={{ fontWeight: '800' }}>
            <Activity size={12} /> 136 IoT Sensors Online
          </span>
        </div>
      </div>

      {/* Telemetry Stream Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {telemetryFeeds.map((feed) => (
          <div
            key={feed.id}
            style={{
              padding: '1.1rem',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${feed.status === 'Warning' ? 'rgba(244, 63, 94, 0.3)' : feed.status === 'Attention' ? 'rgba(245, 158, 11, 0.3)' : 'var(--border-subtle)'}`,
              transition: 'all 0.2s ease',
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {feed.id}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {feed.name}
                </div>
              </div>
              <span className={`badge badge-${feed.status === 'Optimal' ? 'running' : feed.status === 'Attention' ? 'idle' : 'maintenance'}`} style={{ fontSize: '0.72rem' }}>
                {feed.status}
              </span>
            </div>

            {/* 4 Sensor Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', background: 'var(--bg-card)', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Gauge size={12} style={{ color: 'var(--status-running)' }} /> SPEED (RPM)
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '900', color: 'var(--text-primary)', marginTop: '1px' }}>
                  {feed.rpm} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>rpm</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Thermometer size={12} style={{ color: feed.temp > 70 ? 'var(--status-maintenance)' : 'var(--status-idle)' }} /> TEMP (°C)
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '900', color: feed.temp > 70 ? 'var(--status-maintenance)' : 'var(--text-primary)', marginTop: '1px' }}>
                  {feed.temp}°C
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Activity size={12} style={{ color: feed.tension > 22 ? 'var(--status-critical)' : 'var(--accent-primary)' }} /> YARN TENSION
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '900', color: feed.tension > 22 ? 'var(--status-critical)' : 'var(--text-primary)', marginTop: '1px' }}>
                  {feed.tension} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>cN</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Zap size={12} style={{ color: 'var(--status-idle)' }} /> POWER (kW)
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '900', color: 'var(--text-primary)', marginTop: '1px' }}>
                  {feed.power} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>kW</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTelemetryWidget;
