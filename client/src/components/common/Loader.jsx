// ============================================
// src/components/common/Loader.jsx
// Reusable loading spinner
//
// Props:
// - size: 'sm' | 'md' | 'lg'
// - label: optional text shown next to the spinner
// - fullScreen: boolean — centers the loader in the viewport
// - className: extra classes to merge
// ============================================

const SIZE_STYLES = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-[3px]',
};

const Loader = ({
  size = 'md',
  label = '',
  fullScreen = false,
  className = '',
}) => {
  const spinner = (
    <div className="flex items-center gap-3">
      <div
        className={`
          rounded-full border-gray-200 border-t-indigo-600
          animate-spin
          ${SIZE_STYLES[size]}
          ${className}
        `}
      />
      {label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;