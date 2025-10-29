// Import the Express framework
const express = require('express');

// Import the login controller function
// This handles user authentication and token generation
const { login } = require('../controllers/authController');

// Initialize a new Express router instance
const router = express.Router();

// ===== Authentication Route =====

// User login route
// Endpoint: POST /api/auth/login
/*Description: Authenticates a user using credentials (e.g., email & password)
 and returns a JWT token if authentication is successful*/
router.post('/login', login);

// Export the router so it can be used in server.js or other route files
module.exports = router;
