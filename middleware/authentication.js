const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
