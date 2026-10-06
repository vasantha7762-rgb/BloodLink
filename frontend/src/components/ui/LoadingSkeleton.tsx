import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white border border-[#E5E1DC] rounded-card p-5 shadow-subtle animate-pulse space-y-3"
        >
          <div className="h-4 bg-[#FAF9F6] rounded w-1/3" />
          <div className="h-3 bg-[#FAF9F6] rounded w-2/3" />
          <div className="h-8 bg-[#FAF9F6] rounded w-full mt-2" />
        </div>
      ))}
    </div>
  );
};
