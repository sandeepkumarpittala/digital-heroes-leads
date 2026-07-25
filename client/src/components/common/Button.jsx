// ============================================
// src/components/common/Button.jsx
// Reusable button component
//
// Props:
// - children: button content
// - variant: 'primary' | 'secondary' | 'danger' | 'ghost'
// - type: 'button' | 'submit' | 'reset'
// - disabled: boolean
// - isLoading: boolean (shows loading text/state)
// - onClick: function
// - className: extra classes to merge
// ============================================

const VARIANT_STYLES = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300',
  secondary:
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 disabled:text-gray-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
  ghost:
    'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
};

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  isLoading = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2.5 rounded-xl text-sm font-medium
        transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:cursor-not-allowed
        ${VARIANT_STYLES[variant]}
        ${className}
      `}
    >
      {isLoading ? 'Please wait...' : children}
    </button>
  );
};

export default Button;