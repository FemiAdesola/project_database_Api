// Import Mongoose for database operations
const mongoose = require('mongoose');

// Import the Project model (Mongoose schema)
const Project = require('../models/projectModel');


// ===== POST: Create a New Project =====
exports.addProject = async (req, res) => {
  try {
    // Extract project fields from the request body
    const { title, description, status, startDate, endDate, members } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    // Check for duplicate project title
    const existing = await Project.findOne({ title });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Project with this title already exists' });
    }

    // Create a new project document
    // The 'createdBy' field links the project to the authenticated member
    const newProject = new Project({
      title,
      description,
      status,
      startDate,
      endDate,
      members,
      createdBy: req.member._id
    });

    // Save the project to the database
    const saved = await newProject.save();

    // Respond with success and the created project
    res.status(201).json({ success: true, data: saved });

  } catch (err) {
    console.error('Error creating project:', err); // Log detailed error for debugging
    res.status(500).json({ success: false, message: err.message });
  }
};


// ===== GET: Fetch All Projects =====
exports.getProjects = async (req, res) => {
  try {
    // Retrieve all projects, populate related member and creator info, and sort by creation date (newest first)
    const projects = await Project.find()
      .populate('members', 'name -_id')           // Include only the 'name' field for members
      .populate('createdBy', 'name _id role')     // Include creator details (name, id, role)
      .sort({ createdAt: -1 });                   // Sort in descending order of creation

    // Return all projects with a count
    res.status(200).json({ success: true, count: projects.length, data: projects });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching projects' });
  }
};


// ===== GET: Fetch Project by ID =====
exports.getProjectById = async (req, res) => {
  // Validate that the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid project id' });
  }

  try {
    // Find project by ID and populate related fields
    const project = await Project.findById(req.params.id)
      .populate('members', 'name -_id')
      .populate('createdBy', 'name _id role');

    // If project not found, return 404
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Return the found project
    res.status(200).json({ success: true, data: project });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching project' });
  }
};


// ===== PUT: Update an Existing Project =====
exports.updateProject = async (req, res) => {
  // Validate project ID format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid project id' });
  }

  try {
    // Find project by ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Only the project creator is authorized to update
    if (project.createdBy.toString() !== req.member._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this project' });
    }

    // Update project fields and return the updated document
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,          // Return the updated document
      runValidators: true // Run schema validators
    }).populate('members');

    // Return success response with updated project
    res.status(200).json({ success: true, data: updated });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating project' });
  }
};


// ===== DELETE: Remove a Project =====
exports.deleteProject = async (req, res) => {
  // Validate project ID format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid project id' });
  }

  try {
    // Find the project by ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Only the project creator can delete the project
    if (project.createdBy.toString() !== req.member._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this project' });
    }

    // Delete the project from the database
    await project.deleteOne();

    // Return a success response
    res.status(200).json({ success: true, message: 'Project deleted' });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error deleting project' });
  }
};
