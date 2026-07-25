// ============================================
// src/models/User.js
// Mongoose schema/model for Admin authentication
//
// NOTE: Password hashing is intentionally NOT handled here.
// Hashing (bcrypt) will be performed explicitly in the
// auth controller before saving/creating a user.
// ============================================

import mongoose from 'mongoose';

// ------------------------------------------------
// User Schema Definition
// ------------------------------------------------
const userSchema = new mongoose.Schema(
  {
    // Admin's full name
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    // Login email — normalized to lowercase and trimmed
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Hashed password (hashing handled in controller, not here)
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },

    // Role restricted to "admin" only for this project
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
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
const User = mongoose.model('User', userSchema);

export default User;