// ============================================
// src/components/common/Select.jsx
// Reusable dropdown/select component
// (used for Budget Range and Status filters)
//
// Props:
// - label: string
// - name: string
// - value: string
// - onChange: function
// - options: array of strings OR { label, value } objects
// - placeholder: string (shown as disabled first option)
// - error: string (validation error message)
// - required: boolean
// - className: extra classes to merge
// ============================================

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
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

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full px-3.5 py-2.5 rounded-xl text-sm
          border ${error ? 'border-red-400' : 'border-gray-300'}
          bg-white text-gray-900
          focus:outline-none focus:ring-2
          ${error ? 'focus:ring-red-400' : 'focus:ring-indigo-500'}
          transition-colors duration-150
          ${className}
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => {
          const optionValue =
            typeof option === 'string' ? option : option.value;
          const optionLabel =
            typeof option === 'string' ? option : option.label;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>

      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;