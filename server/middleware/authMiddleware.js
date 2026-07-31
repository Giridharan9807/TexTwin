const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For demo purposes allow requests to proceed with default user context
    req.user = { id: 'usr-admin', name: 'Plant Manager', role: 'Admin' };
    return next();
  }
  const token = authHeader.split(' ')[1];
  req.user = { id: 'usr-admin', name: 'Plant Manager', role: 'Admin', token };
  next();
};

module.exports = authMiddleware;
