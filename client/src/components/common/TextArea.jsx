// ============================================
// src/components/common/TextArea.jsx
// Reusable multi-line text input component
// (used for the optional "message" field)
//
// Props:
// - label: string
// - name: string
// - value: string
// - onChange: function
// - placeholder: string
// - error: string (validation error message)
// - rows: number
// - maxLength: number
// - className: extra classes to merge
// ============================================

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  rows = 4,
  maxLength,
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
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-3.5 py-2.5 rounded-xl text-sm resize-none
          border ${error ? 'border-red-400' : 'border-gray-300'}
          bg-white text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2
          ${error ? 'focus:ring-red-400' : 'focus:ring-indigo-500'}
          transition-colors duration-150
          ${className}
        `}
      />

      <div className="flex justify-between items-center mt-1.5">
        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <span />
        )}

        {maxLength && (
          <span className="text-xs text-gray-400">
            {(value || '').length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea;