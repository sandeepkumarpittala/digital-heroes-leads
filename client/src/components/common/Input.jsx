// ============================================
// src/components/common/Input.jsx
// Reusable text input with label and error message
//
// Props:
// - label: string
// - name: string
// - type: 'text' | 'email' | 'password' | ...
// - value: string
// - onChange: function
// - placeholder: string
// - error: string (validation error message)
// - required: boolean
// - className: extra classes to merge
// ============================================

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  className = '',
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-3.5 py-2.5 rounded-xl text-sm
          border ${error ? 'border-red-400' : 'border-gray-300'}
          bg-white text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2
          ${error ? 'focus:ring-red-400' : 'focus:ring-indigo-500'}
          transition-colors duration-150
          ${className}
        `}
      />

      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;