// ============================================
// src/routes/authRoutes.js
// Route definitions for Authentication endpoints
// ============================================

import express from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';

const router = express.Router();

// ------------------------------------------------
// @route   POST /api/auth/register
// @desc    Register a new admin user
// @access  Public (used for seeding — no public signup UI)
// ------------------------------------------------
router.post('/register', registerValidator, register);

// ------------------------------------------------
// @route   POST /api/auth/login
// @desc    Login admin user and receive a JWT
// @access  Public
// ------------------------------------------------
router.post('/login', loginValidator, login);

export default router;