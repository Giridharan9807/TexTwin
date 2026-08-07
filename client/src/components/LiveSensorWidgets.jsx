import React, { useState } from 'react';
import { Thermometer, Gauge, Activity, Zap, Wind, Droplets, Radio, TrendingUp, AlertTriangle, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sparkline = ({ data = [10, 15, 12, 18, 20, 16, 22], color = '#10b981', width = 75, height = 30 }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

const CircleMiniGauge = ({ percentage = 75, color = '#10b981', size = 36, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E2E8F0" strokeWidth={strokeWidth} fill="transparent" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <span style={{ position: 'absolute', fontSize: '0.62rem', fontWeight: '900', color: '#0F172A' }}>
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

const LiveSensorWidgets = () => {
  const navigate = useNavigate();
  const [selectedSensor, setSelectedSensor] = useState(null);

  const sensorWidgets = [
    { title: 'Temperature', val: '52.4 °C', range: '40 – 70 °C', status: 'Nominal', trend: '↑ 0.2°C', icon: Thermometer, color: '#2563EB', pct: 60, points: [48, 50, 51, 53, 52, 52.4], unit: '°C', feeds: 20, description: 'Motor & bearing housing thermal transducer sensors.' },
    { title: 'Loom Speed (RPM)', val: '1,080 RPM', range: '900 – 1,200 RPM', status: 'Optimal', trend: 'Stable', icon: Gauge, color: '#16A34A', pct: 90, points: [1020, 1050, 1080, 1070, 1085, 1080], unit: 'RPM', feeds: 20, description: 'Main shaft rotary encoder sensors measuring picking speed.' },
    { title: 'Vibration', val: '0.18 mm/s', range: '< 0.35 mm/s', status: 'Low Risk', trend: '↓ 0.02', icon: Activity, color: '#16A34A', pct: 51, points: [0.25, 0.22, 0.20, 0.19, 0.18, 0.18], unit: 'mm/s', feeds: 20, description: '3-axis piezoelectric accelerometer measuring shaft oscillation.' },
    { title: 'Power Consumption', val: '16.4 kW', range: '12 – 20 kW', status: 'Efficient', trend: '↓ 1.2 kW', icon: Zap, color: '#7C3AED', pct: 55, points: [18.2, 17.5, 17.0, 16.8, 16.5, 16.4], unit: 'kW', feeds: 20, description: '3-phase active power transducers monitoring motor drive draw.' },
    { title: 'Air Pressure', val: '6.2 Bar', range: '5.5 – 7.0 Bar', status: 'Stable', trend: 'Nominal', icon: Wind, color: '#0284C7', pct: 70, points: [6.0, 6.1, 6.3, 6.2, 6.1, 6.2], unit: 'Bar', feeds: 16, description: 'Compressor main line & air nozzle pneumatic pressure sensors.' },
    { title: 'Ambient Humidity', val: '65% RH', range: '60 – 70% RH', status: 'Ideal Weaving', trend: 'Controlled', icon: Droplets, color: '#059669', pct: 65, points: [63, 64, 66, 65, 65, 65], unit: '% RH', feeds: 12, description: 'Factory floor humidity sensors ensuring optimal yarn strength.' },
    { title: 'Yarn Tension', val: '18.2 cN', range: '15 – 22 cN', status: 'Nominal', trend: 'Nominal', icon: Radio, color: '#16A34A', pct: 64, points: [17.5, 18.0, 18.5, 18.1, 18.3, 18.2], unit: 'cN', feeds: 16, description: 'Optical warp yarn tension load cells preventing yarn breakage.' },
    { title: 'Motor Current', val: '32.5 A', range: '25 – 40 A', status: 'Nominal', trend: 'Stable', icon: Zap, color: '#D97706', pct: 50, points: [31.0, 32.0, 33.0, 32.2, 32.6, 32.5], unit: 'A', feeds: 12, description: 'AC current transformer feeds monitoring main drive motor load.' },
  ];

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Radio size={20} style={{ color: 'var(--accent-primary)' }} /> Live Telemetry Sensor Stream (136 Feeds)
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
            Real-Time Transducer Signal Monitoring Across All Weaving Looms (Click any sensor to inspect related stream)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/sensors')} style={{ fontSize: '0.76rem', fontWeight: '800' }}>
            All Sensors <ChevronRight size={14} />
          </button>
          <span className="badge badge-running">100% Signal Integrity</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.1rem' }}>
        {sensorWidgets.map((sw, idx) => {
          const Icon = sw.icon;
          return (
            <div
              key={idx}
              onClick={() => setSelectedSensor(sw)}
              style={{
                background: '#F8FAFC',
                borderRadius: '10px',
                padding: '1.1rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(37,99,235,0.1)';
                e.currentTarget.style.borderColor = sw.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
              title="Click to inspect real-time 136-feed sensor stream & threshold details"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#64748B' }}>{sw.title}</span>
                <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: `${sw.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: sw.color }}>
                  <Icon size={16} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '0.35rem 0' }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F172A' }}>{sw.val}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>
                    Normal: {sw.range}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <Sparkline data={sw.points} color={sw.color} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px solid #E2E8F0', fontSize: '0.7rem' }}>
                <span style={{ color: '#16A34A', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CircleMiniGauge percentage={sw.pct} color={sw.color} size={22} strokeWidth={3} /> {sw.status}
                </span>
                <span style={{ color: '#475569', fontWeight: '700' }}>{sw.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Transducer Sensor Signal Inspector Modal */}
      {selectedSensor && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 2600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setSelectedSensor(null)}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '1.75rem',
              borderRadius: '14px',
              maxWidth: '680px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              border: `2px solid ${selectedSensor.color}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${selectedSensor.color}15`, color: selectedSensor.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <selectedSensor.icon size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A' }}>{selectedSensor.title} Telemetry Feed Inspector</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>{selectedSensor.description}</div>
                </div>
              </div>
              <button onClick={() => setSelectedSensor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '0.85rem 1.1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '800' }}>LIVE SENSOR READING</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: selectedSensor.color, marginTop: '2px' }}>{selectedSensor.val}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '800' }}>OPERATING BOUNDARY</div>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{selectedSensor.range}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#475569', marginBottom: '0.65rem' }}>TRANSDUCTOR SIGNAL METRICS & MQTT METADATA:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>ACTIVE FEEDS COUNT</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>{selectedSensor.feeds} Transducers</div>
              </div>
              <div style={{ padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>SIGNAL INTEGRITY</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#16A34A', marginTop: '2px' }}>100% Nominally Synced</div>
              </div>
              <div style={{ padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>SAMPLING FREQUENCY</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>10 Hz (100 ms)</div>
              </div>
              <div style={{ padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800' }}>MQTT BROKER LATENCY</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2563EB', marginTop: '2px' }}>18 ms</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedSensor(null)}>
                Close
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => { setSelectedSensor(null); navigate('/sensors'); }}>
                Open Full Sensor Monitoring Module <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSensorWidgets;
