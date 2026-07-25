// ============================================
// src/services/authService.js
// API calls related to Authentication
// Uses the shared Axios instance from services/api.js
// ============================================

import api from './api.js';

// ------------------------------------------------
// login
// POST /auth/login
// Public — authenticates admin, returns { success, token }
// ------------------------------------------------
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};