const mongoose = require('mongoose');
const Member = require('../models/memberModel');

// POST create new member
exports.addMember = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    // Check if email already exists
    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Member with this email already exists' });
    }

    const newMember = new Member({ name, email, role });
    const saved = await newMember.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error creating member' });
  }
};


// GET all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: members.length, data: members });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching members' });
  }
};
