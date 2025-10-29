// server.js

// Load environment variables from the .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import database connection function
const connectDB = require('./db/db');

// Import route modules
const memberRouter = require('./routes/memberRoutes');
const projectRouter = require('./routes/projectRoutes');
const authRouter = require('./routes/authRoutes');

// Define the server port (use environment variable or default to 4000)
const port = process.env.PORT || 4000;

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// ===== Middleware Setup =====

// Enable Cross-Origin Resource Sharing (CORS)
// This allows your API to be accessed by clients from different domains
app.use(cors());

// Parse incoming JSON requests and make the data available in req.body
app.use(express.json());

// ===== API Routes =====

// All member-related routes (e.g., /api/members)
app.use('/api/members', memberRouter);

// All project-related routes (e.g., /api/projects)
app.use('/api/projects', projectRouter);

// Authentication and user management routes (e.g., /api/auth)
app.use('/api/auth', authRouter);

// ===== Static File Serving =====

// Serve static files (HTML) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Default route: send the main index.html file for root requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== Start the Server =====

// Start listening for incoming requests on the specified port
app.listen(port, () =>
  console.log(`API is running in ${process.env.NODE_ENV} mode on port ${port}`)
);
