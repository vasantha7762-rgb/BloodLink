import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Refined BloodLink Logo: Blood Drop integrated with Connection Nodes */}
      <div className={`${iconSizes} rounded-xl bg-gradient-to-br from-[#7F1D3A] to-[#4A2545] p-2 flex items-center justify-center shadow-subtle text-white shrink-0`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          {/* Blood Drop Silhouette */}
          <path d="M12 2.5C12 2.5 5 10 5 15.5C5 19.09 7.91 22 11.5 22C15.09 22 18 19.09 18 15.5C18 10 12 2.5 12 2.5Z" fill="#7F1D3A" fillOpacity="0.4" />
          {/* Interlocking Link Connection */}
          <circle cx="9.5" cy="14.5" r="2" fill="white" />
          <circle cx="14.5" cy="11.5" r="2" fill="white" />
          <path d="M9.5 14.5L14.5 11.5" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        <span className={`font-bold tracking-tight text-[#202124] ${textSizes} leading-none flex items-center gap-1`}>
          Blood<span className="text-[#7F1D3A]">Link</span>
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider mt-0.5">
            Connect. Donate. Save Lives.
          </span>
        )}
      </div>
    </div>
  );
};
