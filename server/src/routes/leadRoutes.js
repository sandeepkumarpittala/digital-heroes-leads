// ============================================
// src/routes/leadRoutes.js
// Route definitions for Lead-related endpoints
//
// NOTE: JWT protection is NOT applied yet.
// GET / PATCH routes will be secured with authMiddleware
// once authentication is implemented in a later phase.
// ============================================

import express from 'express';
import {
  createLead,
  getLeads,
  updateLeadStatus,
} from '../controllers/leadController.js';
import { leadValidator } from '../validators/leadValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ------------------------------------------------
// @route   POST /api/leads
// @desc    Submit a new lead (public — Landing Page form)
// @access  Public
// ------------------------------------------------
router.post('/', leadValidator, createLead);

// ------------------------------------------------
// @route   GET /api/leads
// @desc    Fetch all leads (supports ?search= and ?status= query params)
// @access  Public for now — will become Private (JWT) later
// ------------------------------------------------
router.get('/', getLeads);

// ------------------------------------------------
// @route   PATCH /api/leads/:id/status
// @desc    Update a lead's status (New | Contacted | Closed)
// @access  Public for now — will become Private (JWT) later
// ------------------------------------------------
router.patch('/:id/status', updateLeadStatus);

export default router;