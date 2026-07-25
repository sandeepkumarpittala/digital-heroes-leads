// ============================================
// src/context/AuthContext.jsx
// Global authentication state using React Context API
//
// Manages:
// - token        : the current JWT (or null)
// - isAuthenticated : derived boolean flag
//
// Rehydrates from localStorage on initial load so refreshing
// the page doesn't log the admin out.
// ============================================

import { createContext, useContext, useState } from 'react';
import { TOKEN_KEY } from '../services/api.js';

// ------------------------------------------------
// Create the context
// ------------------------------------------------
const AuthContext = createContext(undefined);

// ------------------------------------------------
// AuthProvider
// Wraps the app and provides auth state + actions
// ------------------------------------------------
export const AuthProvider = ({ children }) => {
  // Initialize token state directly from localStorage
  // so a page refresh doesn't briefly appear "logged out"
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  // Derived flag — true whenever a token is present
  const isAuthenticated = Boolean(token);

  // ------------------------------------------------
  // login
  // Saves token to localStorage and updates context state
  // ------------------------------------------------
  const login = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  // ------------------------------------------------
  // logout
  // Removes token from localStorage and clears context state
  // ------------------------------------------------
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const value = {
    token,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// ------------------------------------------------
// useAuth
// Custom hook for consuming AuthContext safely
// ------------------------------------------------
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};