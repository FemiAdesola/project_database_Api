// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Member = require('../models/memberModel');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find member
    const member = await Member.findOne({ email });
    if (!member) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign(
      { id: member._id, role: member.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, member });
  } catch (err) {
    console.error('Login error:', err); // log the actual error
    res.status(500).json({ message: 'Server error logging in' });
  }
};
