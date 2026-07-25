// ============================================
// src/utils/validators.js
// Client-side validation for the Lead Form
//
// NOTE: This is a UX layer only. The backend (leadValidator.js)
// remains the source of truth for actual data integrity.
// ============================================

// Fixed set of valid Budget Range options (must match the dropdown)
export const BUDGET_RANGE_OPTIONS = [
  'Under ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  'Above ₹1,00,000',
];

// Basic email format check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ------------------------------------------------
// validateName
// - required
// - minimum 2 characters (matches backend rule)
// ------------------------------------------------
export const validateName = (name) => {
  const trimmed = (name || '').trim();

  if (!trimmed) {
    return 'Name is required';
  }

  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters long';
  }

  return null; // no error
};

// ------------------------------------------------
// validateEmail
// - required
// - valid email format
// ------------------------------------------------
export const validateEmail = (email) => {
  const trimmed = (email || '').trim();

  if (!trimmed) {
    return 'Email is required';
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address';
  }

  return null;
};

// ------------------------------------------------
// validateBudgetRange
// - required
// - must be one of the fixed dropdown options
// ------------------------------------------------
export const validateBudgetRange = (budgetRange) => {
  const trimmed = (budgetRange || '').trim();

  if (!trimmed) {
    return 'Budget range is required';
  }

  if (!BUDGET_RANGE_OPTIONS.includes(trimmed)) {
    return 'Please select a valid budget range';
  }

  return null;
};

// ------------------------------------------------
// validateMessage
// - optional
// - maximum 1000 characters (matches backend rule)
// ------------------------------------------------
export const validateMessage = (message) => {
  const trimmed = (message || '').trim();

  if (trimmed.length > 1000) {
    return 'Message cannot exceed 1000 characters';
  }

  return null; // optional field — empty is valid
};

// ------------------------------------------------
// validateLeadForm
// Runs all field validators together and returns
// an errors object — empty object means the form is valid
// ------------------------------------------------
export const validateLeadForm = ({ name, email, budgetRange, message }) => {
  const errors = {};

  const nameError = validateName(name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const budgetRangeError = validateBudgetRange(budgetRange);
  if (budgetRangeError) errors.budgetRange = budgetRangeError;

  const messageError = validateMessage(message);
  if (messageError) errors.message = messageError;

  return errors;
};