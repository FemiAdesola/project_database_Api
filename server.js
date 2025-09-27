// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./db/db');

// Import routers
const memberRouter = require('./routes/memberRoutes');

const port = process.env.PORT || 4000;


const app = express(); // Initialize Express
connectDB(); // Connect to database

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/members', memberRouter);


app.listen(port, () =>
  console.log(`API is running on ${process.env.NODE_ENV} mode on port ${port}`)
);
