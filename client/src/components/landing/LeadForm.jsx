// ============================================
// src/components/landing/LeadForm.jsx
// Lead submission form (Landing Page)
// ============================================

import { useState } from 'react';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import TextArea from '../common/TextArea.jsx';
import SuccessState from './SuccessState.jsx';
import { createLead } from '../../services/leadService.js';
import {
  validateLeadForm,
  BUDGET_RANGE_OPTIONS,
} from '../../utils/validators.js';

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  budgetRange: '',
  message: '',
};

const LeadForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setSubmitError('');
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const validationErrors = validateLeadForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createLead(formData);
      setIsSubmitted(true);
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      setSubmitError(
        backendMessage ||
          'Something went wrong while submitting your request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <SuccessState onReset={handleReset} />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Tell us about your project
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Fill in your details and we'll get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          error={errors.name}
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          error={errors.email}
          required
        />

        <Select
          label="Budget Range"
          name="budgetRange"
          value={formData.budgetRange}
          onChange={handleChange}
          options={BUDGET_RANGE_OPTIONS}
          placeholder="Select your budget range"
          error={errors.budgetRange}
          required
        />

        <TextArea
          label="Message (optional)"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us a bit more about your project..."
          error={errors.message}
          rows={4}
          maxLength={1000}
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
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default LeadForm;