// ============================================
// src/controllers/authController.js
// Business logic for Admin authentication
// (Register & Login)
// ============================================

import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ------------------------------------------------
// @desc    Register a new admin user
// @route   POST /api/auth/register
// @access  Public (or used once for seeding — no public signup UI)
// ------------------------------------------------
export const register = async (req, res) => {
  // Check for validation errors collected by registerValidator middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { name, email, password } = req.body;

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists',
      });
    }

    // Hash the password before storing (salt rounds: 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the admin user with the hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Never return the password in the response
    return res.status(201).json({
      success: true,
      message: 'Admin user registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while registering user',
    });
  }
};

// ------------------------------------------------
// @desc    Login admin user
// @route   POST /api/auth/login
// @access  Public
// ------------------------------------------------
export const login = async (req, res) => {
  // Check for validation errors collected by loginValidator middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT with minimal payload (id + role)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Never return the password — only the token
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while logging in',
    });
  }
};