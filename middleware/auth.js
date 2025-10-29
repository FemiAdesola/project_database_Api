// Import the JSON Web Token (JWT) library
const jwt = require('jsonwebtoken');

// Import the Member model to fetch user details from the database
const Member = require('../models/memberModel');

// ===== Authentication Middleware =====
// This middleware verifies the JWT token sent by the client, authenticates the user, 
// and attaches the corresponding member data to the request object.
async function auth(req, res, next) {
  // Extract the token from the 'Authorization' header (format: "Bearer <token>")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the member associated with the decoded token's ID
    const member = await Member.findById(decoded.id);

    // If the member no longer exists in the database, deny access
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Attach the member object to the request for downstream access (e.g., in controllers)
    req.member = member;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails or an error occurs, return an unauthorized response
    res.status(401).json({ message: 'Token is not valid' });
  }
}

// Export the middleware to be used in route files
module.exports = auth;
