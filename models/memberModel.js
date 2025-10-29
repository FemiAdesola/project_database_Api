// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema for convenience
const bcrypt = require('bcryptjs'); // For password hashing


// ===== Member Schema =====
// Defines the structure of a Member document in MongoDB
const memberSchema = new Schema({
  // Member's full name
  name: {
    type: String,
    required: [true, 'Member name is required'], // Validation message if missing
    trim: true, // Remove leading/trailing whitespace
  },

  // Member's email address
  email: {
    type: String,
    unique: true,   // Ensure no duplicate emails exist in the collection
    lowercase: true, // Store all emails in lowercase for consistency
    trim: true,      // Remove leading/trailing whitespace
  },

  // Member's password (hashed before saving)
  password: {
    type: String,
    required: [true, 'Password is required'], // Validation if password missing
    minlength: 6, // Enforce minimum password length
  },

  // Role of the member for authorization purposes
  role: {
    type: String,
    enum: ['admin', 'developer', 'designer', 'manager', 'tester', 'other'], // Allowed roles
    default: 'developer', // Default role if not specified
  },

  // Timestamp when the member was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// ===== Pre-save Middleware =====
// This middleware runs before saving a member document
// It hashes the password if it has been modified or is new
memberSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password not changed
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed to save
  } catch (err) {
    next(err); // Pass error to Mongoose
  }
});


// ===== Export Member Model =====
// Creates the 'Member' collection in MongoDB using this schema
module.exports = mongoose.model('Member', memberSchema);
