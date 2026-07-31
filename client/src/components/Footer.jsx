import React from 'react';
import { Cpu, ShieldCheck, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid #E2E8F0',
        padding: '0.85rem 1.5rem',
        marginTop: '2rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.78rem',
        color: '#64748B',
        fontWeight: '700',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Cpu size={16} style={{ color: '#2563EB' }} />
        <span>TexTwin Digital Twin Platform © 2026. All rights reserved.</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <span>Version: <strong style={{ color: '#0F172A' }}>TexTwin v1.0</strong></span>
        <span>•</span>
        <span>Environment: <strong style={{ color: '#059669' }}>Production</strong></span>
        <span>•</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Clock size={13} style={{ color: '#2563EB' }} /> Last Sync: <strong style={{ color: '#2563EB', fontFamily: 'JetBrains Mono, monospace' }}>1 sec ago</strong>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
