// Import the Express framework
const express = require('express');

// Import controller functions for member operations
const {
  addMember,      // Handles creating a new member
  getMembers,     // Retrieves all members
  getMemberById,  // Retrieves a specific member by ID
  updateMember,   // Updates a member by ID
  deleteMember    // Deletes a member by ID
} = require('../controllers/memberController');

// Initialize a new Express router instance
const router = express.Router();

// ===== Member Routes =====

// Create a new member
// Endpoint: POST /api/members
// Request body contain member details (e.g., name, role, etc.)
router.post('/', addMember);

// Get all members
// Endpoint: GET /api/members
router.get('/', getMembers);

// Get a specific member by ID
// Endpoint: GET /api/members/:id
router.get('/:id', getMemberById);

// Update an existing member by ID
// Endpoint: PUT /api/members/:id
// Request body contain the updated member data
router.put('/:id', updateMember);

// Delete a member by ID
// Endpoint: DELETE /api/members/:id
router.delete('/:id', deleteMember);

// Export the router to be used in server.js or other route files
module.exports = router;
