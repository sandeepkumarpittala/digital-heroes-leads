// ============================================
// server.js
// Entry point for the LeadDesk (Digital Heroes) backend
// ============================================

// Load environment variables from .env FIRST,
// before any other import that might depend on them
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import leadRoutes from './src/routes/leadRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
// ------------------------------------------------
// Initialize Express app
// ------------------------------------------------
const app = express();

// ------------------------------------------------
// Connect to MongoDB (Atlas/local) using existing db.js
// ------------------------------------------------
connectDB();

// ------------------------------------------------
// Middleware
// ------------------------------------------------

// Enable CORS only for our frontend origin (from .env)
// This prevents random domains from calling our API in production
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Parse incoming JSON request bodies (req.body)
app.use(express.json());

// ------------------------------------------------
// Routes
// ------------------------------------------------

// Health check / root route — confirms the API is alive
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'LeadDesk API is running',
  });
});

// NOTE: Feature routes (leads, auth) will be mounted here
// in later phases, e.g.:
// app.use('/api/leads', leadRoutes);
// app.use('/api/auth', authRoutes);
// Lead-related routes (create, fetch, update status)
app.use('/api/leads', leadRoutes);
// Auth-related routes (register, login)
app.use('/api/auth', authRoutes);
// NOTE: Auth routes will be mounted here in a later phase, e.g.:
// app.use('/api/auth', authRoutes)
// ------------------------------------------------
// Start server
// ------------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`LeadDesk API server running on port ${PORT}`);
});