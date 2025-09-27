const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

// Define the Project schema
const projectSchema = new Schema({
  projectId: { type: String, unique: true },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'on-hold', 'cancelled'],
    default: 'planned',
  },
  startDate: Date,
  endDate: Date,

  // Reference Member documents
  members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
}, { timestamps: true });

// Auto-generate projectId before saving
projectSchema.pre('save', async function(next) {
  if (!this.projectId) {
    try {
      const Project = mongoose.model('Project'); // Avoids OverwriteModelError
      const count = await Project.countDocuments();
      this.projectId = `PRJ-${(count + 1).toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Create and export the Project model
module.exports = mongoose.model('Project', projectSchema);
