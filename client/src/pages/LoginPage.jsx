import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/client';
import Toast from '../components/Toast';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Activity,
  Sparkles,
  Radio,
  ShieldCheck,
  ArrowRight,
  Send,
  X,
  CheckCircle2,
} from 'lucide-react';

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setToast({ message: 'Please enter your original email address and password.', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      const res = await authApi.login({ email, password });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        if (onLoginSuccess) onLoginSuccess(res.data.user);
        setToast({ message: `Welcome back, ${res.data.user.name || 'User'}! Redirecting to workspace...`, type: 'success' });
        setTimeout(() => navigate('/'), 500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Authentication failed. Please check your email and password.';
      setToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName) => {
    try {
      setLoading(true);
      const res = await authApi.socialLogin({
        provider: providerName,
        email: email || `user.${providerName.toLowerCase()}@example.com`,
        name: `${providerName} Authorized User`,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        if (onLoginSuccess) onLoginSuccess(res.data.user);
        setToast({ message: `Signed in with ${providerName}! Redirecting...`, type: 'success' });
        setTimeout(() => navigate('/'), 500);
      }
    } catch (err) {
      setToast({ message: `Failed to sign in with ${providerName}.`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setToast({ message: 'Please enter your email address to receive reset link.', type: 'error' });
      return;
    }

    try {
      setForgotLoading(true);
      const res = await authApi.forgotPassword({ email: forgotEmail });
      if (res.data.success) {
        setForgotSuccess(`Password reset instructions & secure token link have been mailed to ${forgotEmail}. Please check your inbox!`);
        setToast({ message: `Reset link mailed to ${forgotEmail}!`, type: 'success' });
      }
    } catch (err) {
      setToast({ message: 'Failed to send reset email. Please try again.', type: 'error' });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        background: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: 'hidden',
      }}
    >
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style>{`
        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-fade-in {
          animation: fadeInPage 0.45s ease-out forwards;
        }
        .enterprise-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.6rem;
          background: #ffffff;
          border: 1.5px solid #E5E7EB;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0F172A;
          transition: all 0.2s ease;
          outline: none;
        }
        .enterprise-input:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3.5px rgba(37, 99, 235, 0.12);
        }
        .enterprise-input-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748B;
          pointer-events: none;
        }
        .primary-submit-btn {
          width: 100%;
          padding: 0.85rem 1.5rem;
          background: #2563EB;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.22);
        }
        .primary-submit-btn:hover {
          background: #1D4ED8;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.32);
        }
        .primary-submit-btn:disabled {
          background: #94A3B8;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .social-login-btn {
          flex: 1;
          padding: 0.65rem 0.85rem;
          background: #ffffff;
          color: #0F172A;
          border: 1.5px solid #E5E7EB;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        .social-login-btn:hover {
          background: #F1F5F9;
          border-color: #CBD5E1;
          transform: translateY(-1px);
        }
        @media (max-width: 1024px) {
          .split-container {
            flex-direction: column !important;
          }
          .left-branding-panel {
            width: 100% !important;
            padding: 2.5rem 1.75rem !important;
            min-height: auto !important;
          }
          .right-auth-panel {
            width: 100% !important;
            padding: 2.5rem 1.75rem !important;
          }
        }
      `}</style>

      <div className="split-container login-fade-in" style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        
        {/* ==================================================== */}
        {/* LEFT PANEL (55%): INDUSTRIAL BRANDING & VISUAL IDENTITY */}
        {/* ==================================================== */}
        <div
          className="left-branding-panel"
          style={{
            width: '55%',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
            padding: '4rem 4.5rem',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            color: '#ffffff',
          }}
        >
          {/* Subtle Industrial Grid Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(rgba(37, 99, 235, 0.15) 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
              pointerEvents: 'none',
              opacity: 0.6,
            }}
          />

          {/* Top Logo Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', zIndex: 2 }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0F172A 0%, #2563EB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                TEXTWIN
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                DIGITAL TWIN PLATFORM
              </div>
            </div>
          </div>

          {/* Hero Content Section */}
          <div style={{ margin: 'auto 0', padding: '2.5rem 0', zIndex: 2 }}>
            <h1 style={{ fontSize: '2.35rem', fontWeight: '900', color: '#ffffff', lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
              TexTwin Digital Twin Platform
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: '1.65', fontWeight: '500', maxWidth: '560px', marginBottom: '2.5rem' }}>
              Enterprise platform for real-time digital twins, predictive maintenance, AI-powered analytics, IoT telemetry, and smart textile manufacturing.
            </p>

            {/* 4 Feature Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', maxWidth: '580px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.9rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <Activity size={20} style={{ color: '#60A5FA', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F1F5F9' }}>Real-Time Digital Twin Monitoring</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.9rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <Sparkles size={20} style={{ color: '#A78BFA', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F1F5F9' }}>Predictive Maintenance & AI Analytics</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.9rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <Radio size={20} style={{ color: '#38BDF8', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F1F5F9' }}>Live IoT Sensor Telemetry</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.9rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <ShieldCheck size={20} style={{ color: '#34D399', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F1F5F9' }}>Smart Factory Operations Dashboard</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600', zIndex: 2 }}>
            Protected by TexTwin Enterprise Encryption & Role-Based Access Control (RBAC).
          </div>
        </div>

        {/* ==================================================== */}
        {/* RIGHT PANEL (45%): CLEAN AUTHENTICATION FORM */}
        {/* ==================================================== */}
        <div
          className="right-auth-panel"
          style={{
            width: '45%',
            background: '#F8FAFC',
            padding: '4rem 4rem',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%', maxWidth: '420px', margin: 'auto 0' }}>
            
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #0F172A 0%, #2563EB 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                  TEXTWIN
                </div>
                <div style={{ fontSize: '0.64rem', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  DIGITAL TWIN PLATFORM
                </div>
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em' }}>
                Welcome Back
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: '600', marginTop: '4px' }}>
                Sign in to access your Digital Twin workspace.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Original Email Address Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} className="enterprise-input-icon" />
                  <input
                    type="email"
                    className="enterprise-input"
                    placeholder="Enter your original email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Original Password Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setForgotEmail(email); setForgotSuccess(null); setShowForgotModal(true); }}
                    style={{ background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: '800', color: '#2563EB', cursor: 'pointer', padding: 0 }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} className="enterprise-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="enterprise-input"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748B',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginTop: '-0.2rem' }}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer' }}
                />
                <label htmlFor="rememberMe" style={{ fontSize: '0.84rem', fontWeight: '700', color: '#475569', cursor: 'pointer' }}>
                  Remember Me on this device
                </label>
              </div>

              {/* Primary Sign In Button */}
              <button type="submit" className="primary-submit-btn" disabled={loading} style={{ marginTop: '0.5rem' }}>
                {loading ? (
                  <span>Authenticating Credentials...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', margin: '0.65rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase' }}>OR SIGN IN WITH</span>
                <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
              </div>

              {/* 3 OAuth Social Login Options (Google Gmail, Microsoft, Apple iOS) */}
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                {/* Google Gmail */}
                <button type="button" className="social-login-btn" onClick={() => handleSocialLogin('Google Gmail')}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"/>
                    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z"/>
                  </svg>
                  <span>Google</span>
                </button>

                {/* Microsoft */}
                <button type="button" className="social-login-btn" onClick={() => handleSocialLogin('Microsoft')}>
                  <svg width="16" height="16" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  <span>Microsoft</span>
                </button>

                {/* Apple iOS */}
                <button type="button" className="social-login-btn" onClick={() => handleSocialLogin('Apple ID')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0F172A">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.67-.82 1.13-1.96.99-3.1-.98.04-2.17.65-2.87 1.47-.63.73-1.18 1.9-1.03 3.03 1.1.09 2.23-.57 2.91-1.4"/>
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </form>
          </div>

          {/* FOOTER */}
          <div style={{ marginTop: '3rem', width: '100%', maxWidth: '420px', textAlign: 'center', fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>
            <div style={{ marginBottom: '0.4rem' }}>
              © 2026 TexTwin Digital Twin Platform • Version 1.0
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem' }}>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); setToast({ message: 'TexTwin Enterprise Privacy Policy v1.0', type: 'info' }); }} style={{ color: '#475569', textDecoration: 'none', fontWeight: '700' }}>Privacy Policy</a>
              <span>•</span>
              <a href="#terms" onClick={(e) => { e.preventDefault(); setToast({ message: 'TexTwin Terms of Service v1.0', type: 'info' }); }} style={{ color: '#475569', textDecoration: 'none', fontWeight: '700' }}>Terms of Service</a>
              <span>•</span>
              <a href="#help" onClick={(e) => { e.preventDefault(); setToast({ message: 'Contact TexTwin Support: support@textwin.ai', type: 'info' }); }} style={{ color: '#475569', textDecoration: 'none', fontWeight: '700' }}>Help Center</a>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* FORGOT PASSWORD MODAL WITH BACKEND EMAIL INTEGRATION */}
      {/* ==================================================== */}
      {showForgotModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', zIndex: 2600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '440px', padding: '1.75rem', background: '#ffffff', borderRadius: '14px', boxShadow: '0 20px 50px rgba(0,0,0,0.25)', border: '2px solid #2563EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={20} style={{ color: '#2563EB' }} /> Reset Password via Email
              </h3>
              <button onClick={() => setShowForgotModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            {forgotSuccess ? (
              <div>
                <div style={{ padding: '1rem', background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: '8px', color: '#166534', fontWeight: '800', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                  <CheckCircle2 size={20} style={{ marginBottom: '6px' }} />
                  <div>{forgotSuccess}</div>
                </div>
                <button className="primary-submit-btn" onClick={() => setShowForgotModal(false)}>
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendResetEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '600', lineHeight: '1.5' }}>
                  Enter your registered original email address below. We will send a secure password reset link to your email inbox.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155' }}>
                    Registered Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} className="enterprise-input-icon" />
                    <input
                      type="email"
                      className="enterprise-input"
                      placeholder="name@company.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" className="sso-btn" style={{ flex: 1 }} onClick={() => setShowForgotModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="primary-submit-btn" style={{ flex: 1.5 }} disabled={forgotLoading}>
                    {forgotLoading ? (
                      <span>Sending Mail...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Reset Link</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
