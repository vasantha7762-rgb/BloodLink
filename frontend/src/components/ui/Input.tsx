import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  icon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-[#202124] tracking-wide">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-[#667085] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full bg-white border text-sm text-[#202124] placeholder-[#667085]/60 rounded-control transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-400 ${
            icon ? 'pl-9 pr-3 py-2.5' : 'px-3.5 py-2.5'
          } ${
            error
              ? 'border-[#C94B4B] focus:border-[#C94B4B] focus:ring-[#C94B4B]/20'
              : 'border-[#E5E1DC] hover:border-gray-400 focus:border-[#7F1D3A] focus:ring-[#7F1D3A]/15'
          } ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-[#C94B4B] font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#667085]">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
