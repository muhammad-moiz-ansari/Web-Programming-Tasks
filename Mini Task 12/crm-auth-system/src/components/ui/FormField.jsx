'use client';

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder = '',
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-3.5 py-2.5 rounded-lg text-sm
          border transition-all duration-200 outline-none
          bg-white text-slate-800 placeholder-slate-400
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          ${error
            ? 'border-red-400 bg-red-50 focus:ring-red-400'
            : 'border-slate-300 hover:border-slate-400'
          }
        `}
      />
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
