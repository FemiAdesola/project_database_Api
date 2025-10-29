// ===== Admin Authorization Middleware =====
// This middleware checks whether the authenticated user has an admin role.

function checkAdmin(req, res, next) {
  // Verify that a member is authenticated and that their role is 'admin'
  if (req.member && req.member.role === 'admin') {
    // If the user is an admin, proceed to the next middleware or route handler
    return next();
  }

  // If the user is not an admin, deny access with a 403 Forbidden response
  return res.status(403).json({ message: 'Access denied: Admins only.' });
}

// Export the middleware to be used in protected routes
module.exports = checkAdmin;
