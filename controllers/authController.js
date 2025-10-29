// ===== controllers/authController.js =====

// Import required modules
const jwt = require('jsonwebtoken');   // For generating authentication tokens
const bcrypt = require('bcryptjs');    // For securely comparing hashed passwords
const Member = require('../models/memberModel'); // Mongoose model for members


// ===== POST: User Login =====
// This controller handles member authentication by verifying credentials
// and returning a signed JWT token upon successful login.
exports.login = async (req, res) => {
  try {
    // Extract login credentials from request body
    const { email, password } = req.body;

    // ===== Step 1: Check if member exists =====
    // Find the member by email in the database
    const member = await Member.findOne({ email });
    if (!member) {
      // If no account matches the provided email, return an error
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ===== Step 2: Verify Password =====
    // Compare the provided password with the stored (hashed) password
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      // If passwords don’t match, return an error
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ===== Step 3: Generate a JWT Token =====
    // Create a signed token that includes the user's ID and role
    // The token expires in 1 hour (configurable in production)
    const token = jwt.sign(
      { id: member._id, role: member.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ===== Step 4: Send Success Response =====
    // Return the token and member data (can be limited to exclude password)
    res.json({ token, member });

  } catch (err) {
    // Log the error for debugging and send a generic response
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error logging in' });
  }
};
