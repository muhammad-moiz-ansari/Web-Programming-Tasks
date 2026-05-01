'use client';

const variantStyles = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 disabled:bg-indigo-400',
  secondary:
    'bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400 border border-slate-300',
  danger:
    'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-400',
};

export default function Button({
  variant = 'primary',
  onClick,
  children,
  type = 'button',
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2.5 rounded-lg text-sm font-semibold
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:cursor-not-allowed
        ${variantStyles[variant] || variantStyles.primary}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
