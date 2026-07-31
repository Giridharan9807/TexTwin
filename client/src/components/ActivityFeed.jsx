import React from 'react';
import { Sparkles, AlertTriangle, Wrench, CheckCircle2, RotateCcw, Clock, Radio, Activity, Cpu, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActivityFeed = () => {
  const navigate = useNavigate();

  const timelineEvents = [
    { time: '12:30 PM', text: 'LOOM-201 restarted after lube flush & bearing alignment', type: 'restart', icon: RotateCcw, color: '#16A34A' },
    { time: '12:25 PM', text: 'Engineer Rajesh Kumar acknowledged work order WO-8043', type: 'ack', icon: CheckCircle2, color: '#2563EB' },
    { time: '12:18 PM', text: 'Maintenance assigned to LOOM-201 drive shaft bearing', type: 'maint', icon: Wrench, color: '#EA580C' },
    { time: '12:14 PM', text: 'Critical alert generated: Vibration 0.42 mm/s threshold', type: 'alert', icon: AlertTriangle, color: '#DC2626' },
    { time: '12:10 PM', text: 'AI model predicted bearing fatigue anomaly on LOOM-201', type: 'ai', icon: Sparkles, color: '#7C3AED' },
    { time: '11:55 AM', text: 'LOOM-105 Jacquard tension sensor calibration completed', type: 'calib', icon: Cpu, color: '#0EA5E9' },
    { time: '11:42 AM', text: 'Shift 1 production output milestone reached (5,200 m)', type: 'yield', icon: Activity, color: '#059669' },
    { time: '11:30 AM', text: 'MQTT telemetry transducer stream synced for 136 IoT feeds', type: 'mqtt', icon: Radio, color: '#2563EB' },
    { time: '11:15 AM', text: 'Air nozzle compressor line pressure stabilized at 6.2 bar', type: 'stable', icon: ShieldCheck, color: '#16A34A' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', background: '#ffffff', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
      <div>
        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} style={{ color: '#2563EB' }} /> Activity Timeline (Real-Time Log)
          </span>
          <span className="badge badge-running" style={{ fontSize: '0.7rem', fontWeight: '800' }}>Live Stream</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {timelineEvents.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.55rem 0.8rem',
                  borderRadius: '8px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: '#ffffff',
                    border: `1px solid ${item.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={14} />
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                  <span style={{ fontWeight: '700', color: '#0F172A', lineHeight: '1.2' }}>{item.text}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#64748B', fontWeight: '700', fontSize: '0.72rem', marginLeft: '0.5rem', whiteSpace: 'nowrap' }}>{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="btn btn-secondary btn-sm"
        onClick={() => navigate('/alerts')}
        style={{ marginTop: '0.85rem', justifyContent: 'center', fontWeight: '800', width: '100%' }}
      >
        View Full System Logs ({timelineEvents.length} Recent Events)
      </button>
    </div>
  );
};

export default ActivityFeed;
