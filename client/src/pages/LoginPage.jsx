// ============================================
// src/pages/LoginPage.jsx
// Admin login page
//
// On successful login:
// - Saves token via AuthContext
// - Redirects to the originally attempted route (or /admin)
// ============================================

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import { login as loginRequest } from '../services/authService.js';
import { useAuth } from '../context/AuthContext.jsx';

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ------------------------------------------------
  // Handle input changes
  // ------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear any previous error once the user starts editing again
    if (submitError) {
      setSubmitError('');
    }
  };

  // ------------------------------------------------
  // Handle form submission
  // ------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await loginRequest(formData);

      // Save token in AuthContext (+ localStorage)
      login(response.token);

      // Redirect back to the originally attempted route, or /admin by default
      const redirectTo = location.state?.from?.pathname || '/admin';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      setSubmitError(
        backendMessage || 'Invalid email or password. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Admin Login
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to access the LeadDesk dashboard.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {submitError && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="w-full"
          >
            Sign In
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;