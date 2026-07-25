// ============================================
// src/services/api.js
// Centralized Axios instance for all API calls
//
// - Reads backend base URL from Vite env variable
// - Automatically attaches JWT (if present) to every request
// - Automatically clears token on 401 (unauthorized/expired)
// ============================================

import axios from 'axios';

// Key used to store the JWT in localStorage
export const TOKEN_KEY = 'leaddesk_token';

// ------------------------------------------------
// Create a single shared Axios instance
// ------------------------------------------------
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ------------------------------------------------
// Request Interceptor
// Attaches Authorization: Bearer <token> automatically
// if a token exists in localStorage
// ------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------------------------------------
// Response Interceptor
// On 401 (Unauthorized / expired token), clear stored token
// so the app can redirect the user back to /login
// ------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      // NOTE: Actual redirect to /login is handled at the
      // component/context level (e.g. AuthContext or ProtectedRoute),
      // since this file has no access to the router.
    }

    return Promise.reject(error);
  }
);

export default api;