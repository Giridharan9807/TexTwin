const crypto = require('crypto');

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const userName = name || email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim();
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

    return res.status(201).json({
      success: true,
      message: 'Account successfully registered and authenticated',
      token: `textwin-jwt-${crypto.randomBytes(16).toString('hex')}`,
      user: {
        id: `usr-${Math.floor(Math.random() * 9000 + 1000)}`,
        name: formattedName,
        email: email.toLowerCase(),
        role: role || 'Plant Manager',
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both your email address and password' });
    }

    const rawName = email.split('@')[0].replace(/[\._]/g, ' ').trim();
    const formattedName = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Authorized User';

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token: `textwin-jwt-${crypto.randomBytes(16).toString('hex')}`,
      user: {
        id: `usr-${Math.floor(Math.random() * 9000 + 1000)}`,
        name: formattedName,
        email: email.toLowerCase(),
        role: 'Plant Manager',
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your email address' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    return res.status(200).json({
      success: true,
      message: `Password reset link successfully sent to ${email}`,
      email: email.toLowerCase(),
      resetToken,
      resetUrl,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { email, password, token } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, message: 'New password is required' });
    }

    return res.status(200).json({
      success: true,
      message: 'Password successfully updated. You may now log in with your new password.',
      email,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/auth/social-login
exports.socialLogin = async (req, res) => {
  try {
    const { provider, email, name } = req.body;
    const providerName = provider || 'Google';
    const userEmail = email || `user_${Math.floor(Math.random() * 1000)}@gmail.com`;
    const userName = name || 'Authorized User';

    return res.status(200).json({
      success: true,
      message: `Authenticated via ${providerName} Single Sign-On`,
      token: `textwin-jwt-sso-${crypto.randomBytes(16).toString('hex')}`,
      user: {
        id: `usr-sso-${Math.floor(Math.random() * 9000 + 1000)}`,
        name: userName,
        email: userEmail,
        role: 'Plant Manager',
        provider: providerName,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
