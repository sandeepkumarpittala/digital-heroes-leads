// ============================================
// src/validators/leadValidator.js
// Server-side validation rules for lead submissions
// (POST /api/leads)
//
// This is our source of truth for validation — client-side
// validation is just UX; this is what actually protects the data.
// ============================================

import { body } from 'express-validator';

// ------------------------------------------------
// Lead Validation Rules
// ------------------------------------------------
export const leadValidator = [
  // 1. name — required, trimmed, minimum 2 characters
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),

  // 2. email — required, must be a valid email format, normalized
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // 3. budgetRange — required, not empty
  body('budgetRange')
    .trim()
    .notEmpty()
    .withMessage('Budget range is required'),

  // 4. message — optional, trimmed, max 1000 characters
  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters'),
];