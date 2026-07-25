// ============================================
// src/services/leadService.js
// API calls related to Leads
// Uses the shared Axios instance from services/api.js
// ============================================

import api from './api.js';

// ------------------------------------------------
// createLead
// POST /leads
// Public — submits a new lead from the Landing Page form
// ------------------------------------------------
export const createLead = async (payload) => {
  const response = await api.post('/leads', payload);
  return response.data;
};

// ------------------------------------------------
// getLeads
// GET /leads
// Protected — fetches leads, supports search (name/email) and status filter
// params: { search, status }
// ------------------------------------------------
export const getLeads = async (params = {}) => {
  const response = await api.get('/leads', { params });
  return response.data;
};

// ------------------------------------------------
// updateLeadStatus
// PATCH /leads/:id/status
// Protected — updates a single lead's status
// ------------------------------------------------
export const updateLeadStatus = async (id, status) => {
  const response = await api.patch(`/leads/${id}/status`, { status });
  return response.data;
};