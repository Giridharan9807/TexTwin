import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Factory,
  Cpu,
  Server,
  Radio,
  Sparkles,
  FlaskConical,
  Wrench,
  BarChart3,
  AlertTriangle,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Clean Enterprise Navigation Items
  const navItems = [
    { key: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, path: '/', color: '#2563EB' },
    { key: 'factoryOverview', title: 'Factory Overview', icon: Factory, path: '/plants', color: '#0284C7' },
    { key: 'digitalTwin', title: 'Digital Twin', icon: Cpu, path: '/digital-twin', color: '#06B6D4' },
    { key: 'assets', title: 'Assets', icon: Server, path: '/assets', color: '#0EA5E9' },
    { key: 'sensors', title: 'Sensors', icon: Radio, path: '/sensors', color: '#06B6D4' },
    { key: 'aiAnalytics', title: 'AI Analytics', icon: Sparkles, path: '/ai-intelligence', color: '#8B5CF6' },
    { key: 'whatIfSimulator', title: 'What-if Simulator', icon: FlaskConical, path: '/what-if', color: '#F59E0B' },
    { key: 'maintenance', title: 'Maintenance', icon: Wrench, path: '/maintenance', color: '#F97316' },
    { key: 'analytics', title: 'Analytics', icon: BarChart3, path: '/analytics', color: '#4F46E5' },
    { key: 'alerts', title: 'Alerts', icon: AlertTriangle, path: '/alerts', color: '#EF4444' },
    { key: 'reports', title: 'Reports', icon: FileText, path: '/reports', color: '#10B981' },
    { key: 'settings', title: 'Settings', icon: Settings, path: '/settings', color: '#64748B' },
  ];

  const filteredItems = navItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header Brand Logo */}
      <div className="sidebar-brand">
        <div
          className="brand-icon-box"
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #2563EB 100%)',
            boxShadow: '0 3px 10px rgba(37, 99, 235, 0.25)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        {!collapsed && (
          <div className="brand-text-group">
            <span className="brand-title">TexTwin</span>
            <span className="brand-badge">DIGITAL TWIN PLATFORM</span>
          </div>
        )}
      </div>

      {/* Search Bar Input */}
      {!collapsed && (
        <div className="sidebar-search-box">
          <Search size={14} className="sidebar-search-icon" />
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Search navigation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Clean Navigation Menu */}
      <nav className="sidebar-nav">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.key}
              to={item.path}
              className={() => `sidebar-link ${isItemActive ? 'active' : ''}`}
              title={item.title}
              end={item.path === '/'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderLeft: isItemActive ? `4px solid ${item.color}` : '4px solid transparent',
                background: isItemActive ? `${item.color}12` : 'transparent',
              }}
            >
              <Icon size={20} style={{ flexShrink: 0, minWidth: '20px', color: isItemActive ? item.color : 'inherit' }} />
              {!collapsed && (
                <span
                  className="sidebar-link-text"
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: isItemActive ? '800' : '700',
                    color: isItemActive ? item.color : 'inherit',
                  }}
                >
                  {item.title}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse/Expand Sidebar Trigger Button */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? 'Expand Sidebar Menu' : 'Collapse Sidebar Menu'}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
};

export default Sidebar;
