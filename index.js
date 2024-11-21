require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./src/config/db.js'); // Database connection
const apiRoutes = require('./src/routes/api'); // Import routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes


app.use('/api', apiRoutes); // Use routes with a base path of '/api'

// Server Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
