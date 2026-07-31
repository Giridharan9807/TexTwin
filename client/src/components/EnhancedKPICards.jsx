import React from 'react';
import { PlayCircle, Gauge, HeartPulse, AlertTriangle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnhancedKPICards = ({ summary }) => {
  const navigate = useNavigate();

  const totalAssets = summary?.totalAssets || 20;
  const running = summary?.running || 16;
  const health = 96;
  const todayProd = 14250;
  const alerts = summary?.highCriticality || 3;

  const cards = [
    {
      title: 'Running Machines',
      value: `${running} / ${totalAssets}`,
      unit: 'Active',
      trend: '↑ +2 Today',
      trendPositive: true,
      icon: PlayCircle,
      accent: '#22C55E',
      bg: '#DCFCE7',
      route: '/assets',
    },
    {
      title: "Today's Production",
      value: `${todayProd.toLocaleString()}`,
      unit: 'Meters',
      trend: 'Target: 16,000 m (89%)',
      trendPositive: true,
      icon: Gauge,
      accent: '#4F46E5',
      bg: '#EEF2FF',
      route: '/analytics',
    },
    {
      title: 'Machine Health',
      value: `${health}%`,
      unit: 'Excellent',
      trend: 'AI Risk Level: Minimal',
      trendPositive: true,
      icon: HeartPulse,
      accent: '#06B6D4',
      bg: '#ECFEFF',
      route: '/ai-intelligence',
    },
    {
      title: 'Critical Alerts',
      value: alerts,
      unit: 'Active',
      trend: 'Requires Action',
      trendPositive: false,
      icon: AlertTriangle,
      accent: '#EF4444',
      bg: '#FEF2F2',
      route: '/alerts',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem',
      }}
    >
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div
            key={idx}
            onClick={() => navigate(c.route)}
            style={{
              background: c.bg,
              borderRadius: '12px',
              padding: '1.25rem',
              border: `1px solid ${c.accent}30`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = c.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = `${c.accent}30`;
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>{c.title}</span>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: c.accent,
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <Icon size={20} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.7rem', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                {c.value}
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B' }}>{c.unit}</span>
              </div>
              <div
                style={{
                  fontSize: '0.76rem',
                  color: c.accent,
                  fontWeight: '800',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <TrendingUp size={12} /> {c.trend}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EnhancedKPICards;
