import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E5E1DC] rounded-card p-5 shadow-subtle transition-all duration-200 ${
        hoverEffect ? 'hover:-translate-y-1 hover:shadow-card hover:border-[#7F1D3A]/20 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
