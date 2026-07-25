// ============================================
// src/controllers/leadController.js
// Business logic for handling Lead-related requests
// ============================================

import { validationResult } from 'express-validator';
import Lead from '../models/Lead.js';

// ------------------------------------------------
// @desc    Create a new lead (public submission from Landing Page)
// @route   POST /api/leads
// @access  Public
// ------------------------------------------------
export const createLead = async (req, res) => {
  // Check for validation errors collected by leadValidator middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { name, email, budgetRange, message } = req.body;

    const lead = await Lead.create({
      name,
      email,
      budgetRange,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      data: lead,
    });
  } catch (error) {
    // Handle duplicate email (unique index violation)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A lead with this email already exists',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while creating lead',
    });
  }
};

// ------------------------------------------------
// @desc    Get all leads (supports search by name/email and status filter)
// @route   GET /api/leads?search=&status=
// @access  Private (JWT protected)
// ------------------------------------------------
export const getLeads = async (req, res) => {
  try {
    const { search, status } = req.query;

    // Build dynamic query object
    const query = {};

    // Search only by name and email (per approved requirements)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by status if provided (New | Contacted | Closed)
    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching leads',
    });
  }
};
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    // Handles malformed ObjectId as well as other errors
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching lead',
    });
  }
};

// ------------------------------------------------
// @desc    Update a lead's status
// @route   PATCH /api/leads/:id/status
// @access  Private (JWT protected)
// ------------------------------------------------
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Enforce allowed values at the controller level too,
    // in addition to the Mongoose schema enum
    const allowedStatuses = ['New', 'Contacted', 'Closed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead status updated successfully',
      data: lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while updating lead status',
    });
  }
};

// ------------------------------------------------
// @desc    Delete a lead (optional stretch feature)
// @route   DELETE /api/leads/:id
// @access  Private (JWT protected)
// ------------------------------------------------
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting lead',
    });
  }
};

// ------------------------------------------------
// @desc    Get a single lead by ID
// @route   GET /api/leads/:id
// @access  Private (JWT protected)
// --------------------------