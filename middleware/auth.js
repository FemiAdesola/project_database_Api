const jwt = require('jsonwebtoken');
const Member = require('../models/memberModel');

// Middleware to authenticate and attach user to req
async function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const member = await Member.findById(decoded.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    req.user = member;  // Attach member to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = auth;