const express = require('express');
const {
  addMember,
  getMembers
} = require('../controllers/memberController');

// Initialize router
const router = express.Router();

// Define routes
router.post('/', addMember);  // POST /members
router.get('/', getMembers); // GET /members

module.exports = router; // Export the router