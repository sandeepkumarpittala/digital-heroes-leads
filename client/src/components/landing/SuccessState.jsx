// ============================================
// src/components/landing/SuccessState.jsx
// Shown after a lead is successfully submitted
//
// Props:
// - onReset: function — called when "Submit Another Request" is clicked
// ============================================

import Button from '../common/Button.jsx';

const SuccessState = ({ onReset }) => {
  return (
    <div className="w-full max-w-md mx-auto text-center bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-12">
      {/* Success icon */}
      <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        Thank You!
      </h2>

      {/* Confirmation message */}
      <p className="mt-3 text-sm text-gray-600">
        Your request has been received. Our team will review your details
        and reach out to you shortly.
      </p>

      {/* Optional reset button */}
      {onReset && (
        <div className="mt-8">
          <Button variant="secondary" onClick={onReset}>
            Submit Another Request
          </Button>
        </div>
      )}
    </div>
  );
};

export default SuccessState;