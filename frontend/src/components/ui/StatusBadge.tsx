import React from 'react';

type BadgeVariant =
  | 'available' | 'unavailable'
  | 'CRITICAL' | 'URGENT' | 'HIGH' | 'NORMAL'
  | 'Searching' | 'Donor Found' | 'In Progress' | 'Completed' | 'Cancelled'
  | 'Healthy' | 'Low' | 'Critical'
  | 'verified' | 'pending';

interface StatusBadgeProps {
  status: BadgeVariant | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  const getStyles = (st: string) => {
    switch (st) {
      // Availability & Verified
      case 'available':
      case 'verified':
      case 'Healthy':
        return 'bg-[#EBF6F3] text-[#27836A] border-[#27836A]/30 font-semibold';

      case 'unavailable':
      case 'Critical':
      case 'CRITICAL':
        return 'bg-[#FDF2F2] text-[#C94B4B] border-[#C94B4B]/30 font-bold tracking-wide';

      case 'URGENT':
      case 'Low':
      case 'Searching':
        return 'bg-[#FDF7ED] text-[#C58A2B] border-[#C58A2B]/30 font-semibold';

      case 'HIGH':
      case 'In Progress':
      case 'Donor Found':
        return 'bg-[#EFF6F6] text-[#3F7C7A] border-[#3F7C7A]/30 font-semibold';

      case 'NORMAL':
      case 'Completed':
        return 'bg-[#FAF9F6] text-[#667085] border-[#E5E1DC] font-medium';

      case 'pending':
        return 'bg-[#FDF7ED] text-[#C58A2B] border-[#C58A2B]/30 font-medium';

      default:
        return 'bg-[#FAF9F6] text-[#202124] border-[#E5E1DC] font-medium';
    }
  };

  const formattedText = status === 'available' ? 'Available' : status === 'unavailable' ? 'Unavailable' : status;

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs ${sizeClasses} ${getStyles(
        status
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {formattedText}
    </span>
  );
};
