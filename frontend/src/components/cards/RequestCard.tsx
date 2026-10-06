import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { BloodRequest } from '../../types';
import { Hospital, MapPin, Clock, AlertTriangle } from 'lucide-react';

interface RequestCardProps {
  request: BloodRequest;
  onSelect?: (request: BloodRequest) => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({ request, onSelect }) => {
  const isCritical = request.urgency === 'CRITICAL';

  return (
    <Card
      hoverEffect
      className={`relative overflow-hidden flex flex-col justify-between h-full ${
        isCritical ? 'border-l-4 border-l-[#C94B4B]' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-card bg-[#7F1D3A] text-white flex items-center justify-center font-extrabold text-xl shadow-subtle shrink-0">
              {request.bloodGroup}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-[#202124]">
                  {request.unitsRequired} Unit{request.unitsRequired > 1 ? 's' : ''} Required
                </h4>
                {isCritical && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#C94B4B] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#C94B4B]/30 animate-pulse">
                    <AlertTriangle className="w-3 h-3" /> CRITICAL
                  </span>
                )}
              </div>
              <p className="text-xs text-[#667085] mt-0.5">Patient: {request.requesterName}</p>
            </div>
          </div>
          <StatusBadge status={request.urgency} size="sm" />
        </div>

        {/* Info Grid */}
        <div className="space-y-2 text-xs text-[#667085] pt-2 border-t border-[#E5E1DC]/60">
          <div className="flex items-center gap-2">
            <Hospital className="w-3.5 h-3.5 text-[#7F1D3A] shrink-0" />
            <span className="truncate font-medium text-[#202124]">{request.hospitalName}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#7F1D3A] shrink-0" />
              <span>{request.city}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#667085]">
              <Clock className="w-3 h-3 text-[#7F1D3A]" />
              <span>{request.timePosted || 'Recently'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#E5E1DC]/60 flex items-center justify-between gap-3">
        <StatusBadge status={request.status} size="sm" />
        <Button
          variant={isCritical ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onSelect && onSelect(request)}
        >
          View Request
        </Button>
      </div>
    </Card>
  );
};
