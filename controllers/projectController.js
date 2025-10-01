const mongoose = require('mongoose');
const Project = require('../models/projectModel');

// POST create new project
exports.addProject = async (req, res) => {
  try {
    const { title, description, status, startDate, endDate, members } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

     // Check if email already exists
        const existing = await Project.findOne({ title});
        if (existing) {
            return res.status(400).json({ success: false, message: 'Project with this title already exists' });
        }

    const newProject = new Project({ title, description, status, startDate, endDate, members, createdBy: req.member._id });
    const saved = await newProject.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('Error creating project:', err); // 👈 log actual error
    res.status(500).json({ success: false, message: err.message });
  }
};


// GET all projects
// GET all projects (with members populated)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('members', 'name -_id')
      .populate("createdBy", "name _id role")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching projects' });
  }
};

// GET project by id
exports.getProjectById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid project id' });
  }

  try {
    const project = await Project.findById(req.params.id)
      .populate('members', 'name -_id')
      .populate("createdBy", "name _id role");
    if (!project)
        {
          return res.status(404).json({ success: false, message: 'Project not found' });
        }else {
            res.status(200).json({ success: true, data: project });
        }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching project' });
  }
};

// PUT update project
exports.updateProject = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid project id' });
  }

  try {
  const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

      if (project.createdBy.toString() !== req.member._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to edit this project' });
      }

      const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      }).populate('members');

    res.status(200).json({ success: true, data: updated });
      
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating project' });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid project id' });
  }

  try {
  const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    if (project.createdBy.toString() !== req.member._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this project' });
    }

    await project.deleteOne();
    res.status(200).json({ success: true, message: 'Project deleted' });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error deleting project' });
  }
};