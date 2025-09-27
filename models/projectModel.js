import mongoose from "mongoose";
const { Schema } = mongoose; // Destructure Schema from mongoose

// Define the Project schema
const projectSchema = new Schema({
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Project model
const Project = mongoose.model('Project', projectSchema);
export default Project;
