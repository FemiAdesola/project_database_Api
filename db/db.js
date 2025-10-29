// ===== db.js =====

// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// ===== Database Connection Function =====
// This function establishes a connection to the MongoDB database using Mongoose.
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string stored in environment variables
    // process.env.MONGODB_URI contain full connection URI
    const conn = await mongoose.connect(process.env.MONGODB_URI, {});

    // If the connection is successful, optionally log the host:
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If the connection fails, log the error message for debugging
    console.error(`Error: ${error.message}`);

    // Exit the process with failure (1) to prevent the app from running without a database
    process.exit(1);
  }
};

// Export the connection function so it can be used in server.js
module.exports = connectDB;
