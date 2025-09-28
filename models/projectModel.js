const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose
const Counter = require('./counterModel'); // import the counter model

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

// Auto-generate projectId before saving a new project
projectSchema.pre('save', async function (next) {
  if (this.isNew && !this.projectId) {
    try {
      // Increment the counter and get the next sequence number
      const counter = await Counter.findOneAndUpdate( 
        { name: 'projectId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Format the projectId as "PRJ-XXX"
      this.projectId = `PRJ-${counter.seq.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Create and export the Project model
module.exports = mongoose.model('Project', projectSchema);
