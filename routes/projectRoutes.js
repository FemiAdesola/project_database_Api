const express = require('express');

const {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject

} = require('../controllers/projectController');

const router = express.Router();

// Define routes
router.post('/', addProject);   // POST /api/projects
router.get('/', getProjects); // GET /api/projects
router.get('/:id', getProjectById); // GET /api/projects/:id
router.put('/:id', updateProject);     // PUT /api/projects/:id
router.delete('/:id', deleteProject);  // DELETE /api/projects/:id

module.exports = router; // Export the router