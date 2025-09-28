const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose
const bcrypt = require('bcryptjs');

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
   password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'developer', 'designer', 'manager', 'tester', 'other'],
    default: 'developer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
memberSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


// Create and export the Member model
module.exports = mongoose.model('Member', memberSchema);