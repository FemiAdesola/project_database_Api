// Import the Express framework
const express = require('express');

// Import middleware functions
const checkAdmin = require('../middleware/checkAdmin'); // Verifies if the user has admin privileges
const auth = require('../middleware/auth');             // Verifies user authentication (JWT or session)

// Import controller functions for project operations
const {
  addProject,      // Handles creating a new project
  getProjects,     // Retrieves all projects
  getProjectById,  // Retrieves a single project by its ID
  updateProject,   // Updates an existing project
  deleteProject    // Deletes a project
} = require('../controllers/projectController');

// Initialize an Express router
const router = express.Router();

// Apply authentication middleware to all routes
// Ensures all routes below require a valid user token to access
router.use(auth);

// ===== Admin-Only Routes =====

// Create a new project
// Endpoint: POST /api/projects
// Requires admin privileges (checkAdmin middleware)
router.post('/', checkAdmin, addProject);

// ===== Public Routes =====

// Get all projects
// Endpoint: GET /api/projects
// Accessible to all authenticated users
router.get('/', getProjects);

// Get a specific project by ID
// Endpoint: GET /api/projects/:id
// Accessible to all authenticated users
router.get('/:id', getProjectById);

// ===== Admin or Project Creator Routes =====

// Update an existing project by ID
// Endpoint: PUT /api/projects/:id
// Requires admin privileges (further ownership checks handled inside controller)
router.put('/:id', checkAdmin, updateProject);

// Delete a project by ID
// Endpoint: DELETE /api/projects/:id
// Requires admin privileges (further ownership checks handled inside controller)
router.delete('/:id', checkAdmin, deleteProject);

// Export the router for use in server.js
module.exports = router;
