import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-control transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-[#7F1D3A] hover:bg-[#6B1831] text-white shadow-subtle focus:ring-[#7F1D3A]/40 active:translate-y-0.5',
    secondary: 'bg-[#4A2545] hover:bg-[#391C36] text-white focus:ring-[#4A2545]/40 active:translate-y-0.5',
    outline: 'border border-[#E5E1DC] bg-white text-[#202124] hover:bg-[#FAF9F6] hover:border-[#7F1D3A]/30 focus:ring-[#7F1D3A]/20',
    ghost: 'text-[#667085] hover:text-[#202124] hover:bg-[#E5E1DC]/40 focus:ring-gray-300',
    danger: 'bg-[#C94B4B] hover:bg-[#B33E3E] text-white focus:ring-[#C94B4B]/40',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2.5 gap-2 h-10',
    lg: 'text-base px-6 py-3 gap-2.5 h-12',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
