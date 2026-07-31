import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../api/client';
import Toast from '../components/Toast';
import { Cpu, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setToast({ message: 'Please enter your registered work email', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      const res = await authApi.forgotPassword({ email });

      if (res.data.success) {
        setSubmitted(true);
        setToast({ message: res.data.message, type: 'success' });
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to process password reset request.';
      setToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-brand">
          <div className="auth-brand-logo">
            <Cpu size={28} />
          </div>
          <h1 className="auth-title">Password Reset</h1>
          <p className="auth-subtitle">Enter your work email to receive a Digital Twin password reset link</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle size={48} style={{ color: 'var(--status-running)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Reset Link Dispatched
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              If an account exists for <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>, password recovery instructions have been sent.
            </p>
            <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <ArrowLeft size={18} /> Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Work Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
                <input
                  type="email"
                  className="form-control"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="engineer@textwin.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', marginTop: '0.5rem' }}
            >
              {loading ? 'Processing...' : 'Send Reset Link'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Link
                to="/login"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <ArrowLeft size={16} /> Return to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
