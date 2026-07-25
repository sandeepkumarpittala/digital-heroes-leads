// ============================================
// src/validators/authValidator.js
// Server-side validation rules for authentication
// (Register & Login)
// ============================================

import { body } from 'express-validator';

// ------------------------------------------------
// Register Validation Rules
// (Used for creating/seeding an admin account)
// ------------------------------------------------
export const registerValidator = [
  // name — required, trimmed, minimum 2 characters
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),

  // email — required, must be a valid email format, normalized
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // password — required, minimum 6 characters
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// ------------------------------------------------
// Login Validation Rules
// ------------------------------------------------
export const loginValidator = [
  // email — required, must be a valid email format, normalized
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // password — required, not empty (no length check on login;
  // we just need to verify what was entered against the hash)
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];