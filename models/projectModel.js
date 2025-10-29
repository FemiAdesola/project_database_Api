// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema for convenience

// Import the Counter model to generate auto-incrementing project IDs
const Counter = require('./counterModel');


// ===== Project Schema =====
// Defines the structure of a Project document in MongoDB
const projectSchema = new Schema({
  // Unique project identifier (auto-generated)
  projectId: { 
    type: String, 
    unique: true 
  },

  // Project title (required)
  title: {
    type: String,
    required: [true, 'Project title is required'], // Validation message
    trim: true, // Remove leading/trailing whitespace
  },

  // Project description (optional)
  description: {
    type: String,
    default: '',
    trim: true,
  },

  // Project status
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'on-hold', 'cancelled'], // Allowed values
    default: 'planned', // Default status
  },

  // Reference to the member who created the project
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member", // Link to the Member model
    required: true
  },

  // Start and end dates for the project
  startDate: { type: Date, required: true },
  endDate: {
    type: Date,
    required: true,
    validate: {
      // Ensure endDate >= startDate
      validator: function (value) {
        return !this.startDate || value >= this.startDate;
      },
      message: 'End date must be greater than or equal to start date',
    },
  },

  // References to members assigned to this project
  members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields


// ===== Pre-save Middleware =====
// Auto-generate a unique projectId before saving a new project
projectSchema.pre('save', async function (next) {
  // Only generate projectId for new documents that don't already have one
  if (this.isNew && !this.projectId) {
    try {
      // Increment the counter for projectId in the Counter collection
      const counter = await Counter.findOneAndUpdate(
        { name: 'projectId' },        // Counter name
        { $inc: { seq: 1 } },         // Increment sequence by 1
        { new: true, upsert: true }   // Create counter if it doesn't exist
      );

      // Format projectId as "PRJ-XXX" (e.g., PRJ-001, PRJ-002)
      this.projectId = `PRJ-${counter.seq.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err); // Pass error to Mongoose if something goes wrong
    }
  }
  next();
});


// ===== Export Project Model =====
// Creates the 'Project' collection in MongoDB using this schema
module.exports = mongoose.model('Project', projectSchema);
