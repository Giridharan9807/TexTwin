import React, { useState } from 'react';
import { User, Shield, Bell, Key, Save, CheckCircle2, Mail, Phone, MapPin, Building, Lock, Smartphone, Volume2, HardDrive } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [savedMessage, setSavedMessage] = useState('');

  // Logged-in User Profile State
  const [profile, setProfile] = useState({
    name: 'Giridharan R',
    email: 'giridharan9807@gmail.com',
    phone: '+91 98765 43210',
    designation: 'Senior Plant Manager & Digital Twin Specialist',
    factoryHub: 'Coimbatore Hub (Primary Mill)',
    department: 'High-Speed Weaving & AI Control Center',
    employeeId: 'EMP-TEX-2026-9807',
  });

  // Password & Security State
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    enable2FA: true,
  });

  // Personal Notifications State
  const [notifications, setNotifications] = useState({
    emailCriticalAlerts: true,
    emailDailyReport: true,
    smsUrgentWorkOrders: true,
    soundChimeAlerts: true,
    aiRulWarningAlerts: true,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('user_profile', JSON.stringify(profile));
    setSavedMessage('Your user profile and personal preferences have been saved!');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (security.newPassword && security.newPassword !== security.confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    setSavedMessage('Security credentials and password updated successfully!');
    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '', enable2FA: security.enable2FA });
    setTimeout(() => setSavedMessage(''), 4000);
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    setSavedMessage('Notification preferences updated!');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1>⚙️ User Settings & My Profile</h1>
            <span className="badge badge-running" style={{ fontWeight: '800' }}>Active Account</span>
          </div>
          <p>Manage Your Personal Profile, Security Credentials, Notification Alert Preferences, and Assigned Plant Roles</p>
        </div>
      </div>

      {savedMessage && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'var(--status-running-bg)', color: 'var(--status-running)', border: '1px solid rgba(8, 131, 149, 0.3)', borderRadius: '8px', marginBottom: '1.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {savedMessage}
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={16} /> My User Profile
          </button>
          <button className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
            <Lock size={16} /> Password & Security
          </button>
          <button className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
            <Bell size={16} /> Notification Alerts
          </button>
          <button className={`tab-btn ${activeTab === 'role' ? 'active' : ''}`} onClick={() => setActiveTab('role')}>
            <Shield size={16} /> My Permissions & Role
          </button>
        </div>

        {/* TAB 1: User Profile Settings */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '1.6rem',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                GR
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>{profile.name}</h3>
                <span className="badge badge-running" style={{ fontSize: '0.74rem', marginTop: '4px' }}>Plant Manager • Employee ID: {profile.employeeId}</span>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Designation / Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.designation}
                  onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Primary Assigned Factory Hub</label>
                <select
                  className="form-control"
                  value={profile.factoryHub}
                  onChange={(e) => setProfile({ ...profile, factoryHub: e.target.value })}
                >
                  <option value="Coimbatore Hub (Primary Mill)">Coimbatore Hub (Primary Mill)</option>
                  <option value="Tirupur Facility">Tirupur Facility</option>
                  <option value="Gujarat Hub">Gujarat Hub</option>
                  <option value="Kanchipuram Hub">Kanchipuram Hub</option>
                  <option value="Salem Hub">Salem Hub</option>
                  <option value="Surat Hub">Surat Hub</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Department</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                <Save size={16} /> Save Profile Changes
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: Password & Account Security */}
        {activeTab === 'security' && (
          <form onSubmit={handleSaveSecurity} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>Update Password & Security Options</h3>

            <div className="form-grid">
              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter current password"
                  value={security.currentPassword}
                  onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new strong password"
                  value={security.newPassword}
                  onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>Two-Factor Authentication (2FA)</label>
                <select
                  className="form-control"
                  value={security.enable2FA ? 'Enabled' : 'Disabled'}
                  onChange={(e) => setSecurity({ ...security, enable2FA: e.target.value === 'Enabled' })}
                >
                  <option value="Enabled">Enabled (SMS / Authenticator App)</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                <Key size={16} /> Update Password & Security
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: Personal Notification Alerts */}
        {activeTab === 'notifications' && (
          <form onSubmit={handleSaveNotifications} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>Personal Alert & Notification Delivery Settings</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '700', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notifications.emailCriticalAlerts}
                  onChange={(e) => setNotifications({ ...notifications, emailCriticalAlerts: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                />
                Receive Immediate Email Alerts for Critical Machine Alarms (Motor Overheat & High Vibration)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '700', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notifications.emailDailyReport}
                  onChange={(e) => setNotifications({ ...notifications, emailDailyReport: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                />
                Send Daily Morning OEE & Production Summary PDF Report to My Email (06:00 AM)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '700', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notifications.smsUrgentWorkOrders}
                  onChange={(e) => setNotifications({ ...notifications, smsUrgentWorkOrders: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                />
                Receive Urgent SMS Alerts on Mobile Phone when Work Orders are Dispatched
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '700', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notifications.soundChimeAlerts}
                  onChange={(e) => setNotifications({ ...notifications, soundChimeAlerts: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                />
                Enable Dashboard Audio Sound Chime when Critical Telemetry Alarms Trigger
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                <Save size={16} /> Save Notification Preferences
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: My Permissions & Role */}
        {activeTab === 'role' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>My Assigned Access Permissions</h3>

            <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--accent-primary)' }}>ASSIGNED ROLE: PLANT MANAGER</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>Full Administrative Access across All 6 Regional Factory Plants</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', fontWeight: '600' }}>
                Privileges: Add / Edit / Delete Machines, Dispatch Work Orders, Modify Alarm Rules, Access Hybrid Databases (MySQL & MongoDB).
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '800' }}>MYSQL DB ACCESS</div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--status-running)', marginTop: '2px' }}>Read / Write / Delete</div>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '800' }}>MONGODB TELEMETRY ACCESS</div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--status-running)', marginTop: '2px' }}>Full Stream Stream Read / Write</div>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '800' }}>AI RUL MODEL ACCESS</div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--status-running)', marginTop: '2px' }}>Full Model Override & Diagnostics</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
