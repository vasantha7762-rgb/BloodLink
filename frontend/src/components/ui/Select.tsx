import React, { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-[#202124] tracking-wide">
          {label}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={`w-full bg-white border text-sm text-[#202124] rounded-control px-3.5 py-2.5 transition-all duration-150 focus:outline-none focus:ring-2 appearance-none bg-no-repeat bg-[right_0.8rem_center] cursor-pointer ${
          error
            ? 'border-[#C94B4B] focus:border-[#C94B4B] focus:ring-[#C94B4B]/20'
            : 'border-[#E5E1DC] hover:border-gray-400 focus:border-[#7F1D3A] focus:ring-[#7F1D3A]/15'
        } ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23667085%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")`,
          backgroundSize: '1.1rem',
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="text-xs text-[#C94B4B] font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#667085]">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
