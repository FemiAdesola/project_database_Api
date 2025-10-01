const express = require('express');
const checkAdmin = require('../middleware/checkAdmin');
const auth = require('../middleware/auth');

const {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject

} = require('../controllers/projectController');

const router = express.Router();

router.use(auth); // Apply auth middleware to all routes

// Admin-only routes
router.post('/', checkAdmin, addProject);   // POST /api/projects

// Public routes
router.get('/', getProjects); // GET /api/projects
router.get('/:id', getProjectById); // GET /api/projects/:id

// Only creator-admin (checked inside controller)
router.put('/:id', checkAdmin, updateProject);     // PUT /api/projects/:id
router.delete('/:id', checkAdmin, deleteProject);  // DELETE /api/projects/:id

module.exports = router; // Export the router