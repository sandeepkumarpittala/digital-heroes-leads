// ============================================
// src/routes/AppRoutes.jsx
// Central route configuration for the app
//
// Public:    /        -> LandingPage
//            /login   -> LoginPage
// Protected: /admin   -> AdminDashboardPage (via ProtectedRoute)
// Fallback:  *         -> redirect to /
// ============================================

import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>

      {/* Fallback — redirect unknown routes to Landing Page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;