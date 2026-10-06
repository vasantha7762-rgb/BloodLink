import React from 'react';
import { Check } from 'lucide-react';
import { RequestStatus } from '../../types';

interface ProgressTrackerProps {
  currentStatus: RequestStatus;
}

const STAGES = [
  { key: 'Searching', label: 'Created & Searching' },
  { key: 'Donor Found', label: 'Donor Accepted' },
  { key: 'In Progress', label: 'Hospital Coordination' },
  { key: 'Completed', label: 'Donation Completed' },
];

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStatus }) => {
  const getStageIndex = (status: RequestStatus) => {
    switch (status) {
      case 'Searching':
        return 0;
      case 'Donor Found':
        return 1;
      case 'In Progress':
        return 2;
      case 'Completed':
        return 3;
      default:
        return 0;
    }
  };

  const currentIndex = getStageIndex(currentStatus);

  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#E5E1DC] -z-0" />
        
        {/* Active Progress Line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#7F1D3A] transition-all duration-500 ease-in-out -z-0"
          style={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
        />

        {STAGES.map((stage, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center bg-[#FAF9F6] px-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isDone
                    ? 'bg-[#7F1D3A] text-white shadow-subtle'
                    : isCurrent
                    ? 'bg-white border-2 border-[#7F1D3A] text-[#7F1D3A] shadow-card scale-110'
                    : 'bg-white border border-[#E5E1DC] text-[#667085]'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span
                className={`mt-2 text-xs font-semibold text-center max-w-[90px] ${
                  isCurrent ? 'text-[#7F1D3A]' : isDone ? 'text-[#202124]' : 'text-[#667085]'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
