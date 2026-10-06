import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import type { Donor } from '../../types';
import { MapPin, CheckCircle2 } from 'lucide-react';

interface DonorCardProps {
  donor: Donor;
  onSelect?: (donor: Donor) => void;
}

export const DonorCard: React.FC<DonorCardProps> = ({ donor, onSelect }) => {
  return (
    <Card hoverEffect className="flex flex-col justify-between h-full space-y-4">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-card bg-[#7F1D3A] text-white flex items-center justify-center font-black text-lg shadow-subtle">
              {donor.bloodGroup}
            </div>
            <div>
              <h4 className="font-bold text-base text-[#202124] flex items-center gap-1.5">
                {donor.name}
                <span title="Verified Donor">
                  <CheckCircle2 className="w-4 h-4 text-[#27836A]" />
                </span>
              </h4>
              <p className="text-xs text-[#667085] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#7F1D3A]" />
                {donor.city} ({donor.distanceKm || '3.5'} km away)
              </p>
            </div>
          </div>
          <StatusBadge status={donor.availability} size="sm" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5E1DC]/60 text-xs">
          <div className="bg-[#FAF9F6] p-2 rounded-control border border-[#E5E1DC]/40">
            <span className="text-[#667085] block text-[10px] uppercase font-semibold">Last Donation</span>
            <span className="font-semibold text-[#202124]">{donor.lastDonationDate || '3 months ago'}</span>
          </div>
          <div className="bg-[#FAF9F6] p-2 rounded-control border border-[#E5E1DC]/40">
            <span className="text-[#667085] block text-[10px] uppercase font-semibold">Total Donations</span>
            <span className="font-semibold text-[#202124]">{donor.totalDonations} times</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <Button
        variant={donor.availability === 'available' ? 'primary' : 'outline'}
        size="sm"
        className="w-full"
        onClick={() => onSelect && onSelect(donor)}
      >
        View Profile & Request
      </Button>
    </Card>
  );
};
