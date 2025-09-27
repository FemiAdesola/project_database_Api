const express = require('express');
const {
  addMember,
  getMembers,
  getMemberById
} = require('../controllers/memberController');

// Initialize router
const router = express.Router();

// Define routes
router.post('/', addMember);  // POST /members
router.get('/', getMembers); // GET /members
router.get('/:id', getMemberById); // GET /members/:id

module.exports = router; // Export the router