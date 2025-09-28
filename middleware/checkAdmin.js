// Middleware to check if user is admin
function checkAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Admins only.' });
}

module.exports = checkAdmin;