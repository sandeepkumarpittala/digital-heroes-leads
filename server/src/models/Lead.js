// ============================================
// src/models/Lead.js
// Mongoose schema/model for storing leads submitted
// through the public Lead Form (Landing Page)
// ============================================

import mongoose from 'mongoose';

// ------------------------------------------------
// Lead Schema Definition
// ------------------------------------------------
const leadSchema = new mongoose.Schema(
  {
    // Full name of the person submitting the lead form
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    // Email address — normalized to lowercase and trimmed
    // to avoid duplicate leads differing only by casing/whitespace
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Budget range selected from a fixed dropdown on the frontend
    // (e.g. "Under ₹10,000", "₹10,000 – ₹25,000", etc.)
    // Stored as String since it's a fixed set of display labels,
    // not a numeric range
    budgetRange: {
      type: String,
      required: [true, 'Budget range is required'],
      trim: true,
    },

    // Optional free-text message from the lead
    message: {
      type: String,
      trim: true,
    },

    // Current stage of the lead in the admin workflow
    // Restricted to a fixed set of values via enum
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
  },
  {
    // Automatically adds and manages createdAt / updatedAt fields
    timestamps: true,
  }
);

// ------------------------------------------------
// Export Model
// ------------------------------------------------
const Lead = mongoose.model('Lead', leadSchema);

export default Lead;