import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Factory, Bell, LogOut, ChevronDown, Layers } from 'lucide-react';

const HeaderBar = ({ selectedPlant = 'Coimbatore Hub', onPlantChange, user, onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLine, setSelectedLine] = useState('Line 2');

  const currentUser = user || { name: 'Giridharan R', role: 'Plant Manager', email: 'manager@textwin.ai' };

  return (
    <header
      className="header-bar"
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #E2E8F0',
        padding: '0.75rem 1.75rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        minHeight: '64px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Left / Center: Cascading Selectors & Time Context (Logo removed to avoid 2x duplicate logo) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
        {/* Factory Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Factory size={16} style={{ color: '#2563EB' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569' }}>Factory:</span>
          <select
            value={selectedPlant}
            onChange={(e) => onPlantChange && onPlantChange(e.target.value)}
            style={{
              fontWeight: '800',
              color: '#0F172A',
              border: '1px solid #CBD5E1',
              borderRadius: '7px',
              padding: '0.35rem 0.75rem',
              background: '#F8FAFC',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <option value="Coimbatore Hub">Coimbatore Hub</option>
            <option value="Tirupur Facility">Tirupur Facility</option>
            <option value="Gujarat Hub">Gujarat Hub</option>
            <option value="Kanchipuram Hub">Kanchipuram Hub</option>
            <option value="Salem Hub">Salem Hub</option>
            <option value="Surat Hub">Surat Hub</option>
          </select>
        </div>

        {/* Production Line Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={16} style={{ color: '#2563EB' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569' }}>Line:</span>
          <select
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
            style={{
              fontWeight: '800',
              color: '#0F172A',
              border: '1px solid #CBD5E1',
              borderRadius: '7px',
              padding: '0.35rem 0.75rem',
              background: '#F8FAFC',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <option value="Line 1">Line 1 - High Speed</option>
            <option value="Line 2">Line 2 - Heavy Air Jet</option>
            <option value="Line 3">Line 3 - Rapier Weaving</option>
          </select>
        </div>

        {/* Shift & Date/Time Badge */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '700', display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          <span>Shift: <strong style={{ color: '#0F172A' }}>Morning</strong></span>
          <span style={{ color: '#CBD5E1' }}>|</span>
          <span>31 Jul 2026</span>
          <span style={{ color: '#CBD5E1' }}>|</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#2563EB', fontWeight: '800' }}>12:35 PM</span>
        </div>
      </div>

      {/* Right: Notification Bell & Clean User Profile Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Notification Bell */}
        <div
          onClick={() => navigate('/alerts')}
          style={{
            position: 'relative',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '8px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Notifications"
        >
          <Bell size={20} style={{ color: '#475569' }} />
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#EF4444',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: '900',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 5px #EF4444',
            }}
          >
            3
          </span>
        </div>

        {/* Clean User Profile (No Duplication) */}
        <div style={{ position: 'relative' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.9rem',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
              }}
            >
              GR
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.1' }}>
                {currentUser.name}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#2563EB' }}>
                {currentUser.role}
              </span>
            </div>
            <ChevronDown size={14} style={{ color: '#64748B' }} />
          </div>

          {/* User Dropdown with Detailed Factory Context */}
          {showDropdown && (
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                right: 0,
                top: '52px',
                width: '250px',
                padding: '1rem',
                zIndex: 300,
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', marginBottom: '0.75rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#2563EB', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                  GR
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '0.76rem', color: '#2563EB', fontWeight: '800' }}>{currentUser.role}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.85rem', fontWeight: '700' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Assigned Factory:</span>
                  <strong style={{ color: '#0F172A' }}>{selectedPlant}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Active Shift:</span>
                  <strong style={{ color: '#0F172A' }}>Morning Shift</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Email:</span>
                  <strong style={{ color: '#0F172A', fontSize: '0.74rem' }}>{currentUser.email}</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  onLogout && onLogout();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 0.85rem',
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '6px',
                  color: '#EF4444',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={15} /> Sign Out Platform
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
