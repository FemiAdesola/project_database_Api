// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// ===== Counter Schema =====
// This schema is used to maintain a sequential counter in the database,
// used for generating auto-incrementing IDs or sequence numbers.
const counterSchema = new mongoose.Schema({
  // Name of the counter (e.g., 'project', 'member', etc.)
  name: { 
    type: String, 
    required: true,   // Name is mandatory
    unique: true      // Each counter name must be unique
  },

  // Current sequence number for this counter
  seq: { 
    type: Number, 
    default: 0        // Starts from 0 if not specified
  }
});

// Export the model to be used in other parts of the application
module.exports = mongoose.model('Counter', counterSchema);
