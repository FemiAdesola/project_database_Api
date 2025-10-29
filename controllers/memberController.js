// Import Mongoose for ObjectId validation and database operations
const mongoose = require('mongoose');

// Import the Member model (Mongoose schema)
const Member = require('../models/memberModel');


// ===== POST: Create a New Member =====
exports.addMember = async (req, res) => {
  try {
    // Extract fields from the request body
    const { name, email, role, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // Check if a member with the same email already exists
    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Member with this email already exists'
      });
    }

    // Create a new member document
    const newMember = new Member({ name, email, role, password });

    // Save the new member to the database
    const saved = await newMember.save();

    // Respond with success and the created member data
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    // Handle unexpected server errors
    res.status(500).json({
      success: false,
      message: 'Server error creating member'
    });
  }
};


// ===== GET: Retrieve All Members =====
exports.getMembers = async (req, res) => {
  try {
    // Retrieve all members, sorted by creation date (newest first)
    const members = await Member.find().sort({ createdAt: -1 });

    // Respond with the list of members and their count
    return res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching members'
    });
  }
};


// ===== GET: Retrieve a Single Member by ID =====
exports.getMemberById = async (req, res) => {
  // Validate that the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid member id'
    });
  }

  try {
    // Find the member by ID
    const member = await Member.findById(req.params.id);

    // If member not found, return 404
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Return the member data if found
    return res.status(200).json({
      success: true,
      data: member
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Server error fetching member'
    });
  }
};


// ===== PUT: Update an Existing Member =====
exports.updateMember = async (req, res) => {
  // Validate member ID format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid member id'
    });
  }

  try {
    // Find the member by ID and update with new data
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,          // Return the updated document
      runValidators: true // Enforce schema validation
    });

    // If member not found, return 404
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Member not found and not updated'
      });
    }

    // Return the updated member
    res.status(200).json({ success: true, data: updated });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Server error updating member'
    });
  }
};


// ===== DELETE: Remove a Member =====
exports.deleteMember = async (req, res) => {
  // Validate member ID format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid member id'
    });
  }

  try {
    // Find and delete the member by ID
    const deleted = await Member.findByIdAndDelete(req.params.id);

    // If no member found, respond with 404
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Return success message if deleted
    res.status(200).json({
      success: true,
      message: 'Member deleted'
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Server error deleting member'
    });
  }
};
