const express = require('express');
const {
  addMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember
} = require('../controllers/memberController');

// Initialize router
const router = express.Router();

// Define routes
router.post('/', addMember);  // POST /api/members
router.get('/', getMembers); // GET /api/members
router.get('/:id', getMemberById); // GET /api/members/:id
router.put('/:id', updateMember); // PUT /api/members/:id
router.delete('/:id', deleteMember);     // DELETE /api/members/:id

module.exports = router; // Export the router