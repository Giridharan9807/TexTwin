import React from 'react';
import { NavLink } from 'react-router-dom';
import { Cpu, LayoutDashboard, Server, PlusCircle, Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-content">
        <NavLink to="/" className="brand-logo">
          <div className="brand-icon-box">
            <Cpu size={24} />
          </div>
          <span>TexTwin</span>
          <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)', borderRadius: '12px', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Digital Twin</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/assets" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Server size={18} />
            <span>Asset List</span>
          </NavLink>

          <NavLink to="/assets/new" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <PlusCircle size={18} />
            <span>Add Asset</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
