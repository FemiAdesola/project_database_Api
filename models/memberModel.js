const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

// Define the Member schema
const memberSchema = new Schema({
  name: {
    type: String, 
    required: [true, 'Member name is required'],
    trim: true,
  },
  email: {
    type: String,
    unique: true, // prevent duplicates in DB
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['developer', 'designer', 'manager', 'tester', 'other'],
    default: 'developer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Member model
module.exports = mongoose.model('Member', memberSchema);