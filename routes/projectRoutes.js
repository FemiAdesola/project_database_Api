const express = require('express');

const {
  addProject,
  getProjects

} = require('../controllers/projectController');

const router = express.Router();

// Define routes
router.post('/', addProject);   // POST /api/projects
router.get('/', getProjects); // GET /api/projects

module.exports = router; // Export the router