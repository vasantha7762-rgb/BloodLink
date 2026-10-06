import React, { ReactNode } from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Results Found',
  description = 'Try adjusting your search filters or check back later for updates.',
  icon = <SearchX className="w-10 h-10 text-[#667085]" />,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-card border border-[#E5E1DC] shadow-subtle my-4">
      <div className="p-4 rounded-full bg-[#FAF9F6] border border-[#E5E1DC] mb-4">
        {icon}
      </div>
      <h4 className="text-base font-bold text-[#202124]">{title}</h4>
      <p className="text-sm text-[#667085] max-w-sm mt-1 mb-6 leading-relaxed">{description}</p>
      {action}
    </div>
  );
};
