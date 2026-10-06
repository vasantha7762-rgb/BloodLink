import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Hospital as HospitalType } from '../../types';
import { Building2, MapPin, Phone, ShieldCheck, Droplets } from 'lucide-react';

interface HospitalCardProps {
  hospital: HospitalType;
  onSelect?: (hospital: HospitalType) => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onSelect }) => {
  return (
    <Card hoverEffect className="flex flex-col justify-between h-full space-y-4">
      <div className="space-y-3">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-card bg-[#FAF9F6] border border-[#E5E1DC] text-[#7F1D3A] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#202124]">{hospital.name}</h4>
              <p className="text-xs text-[#667085] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#7F1D3A]" />
                {hospital.city}
              </p>
            </div>
          </div>
          <StatusBadge status={hospital.verificationStatus} size="sm" />
        </div>

        {/* Contact info */}
        <div className="bg-[#FAF9F6] p-3 rounded-control border border-[#E5E1DC]/60 space-y-1.5 text-xs text-[#667085]">
          <div className="flex items-center justify-between">
            <span>Contact Person:</span>
            <strong className="text-[#202124]">{hospital.contactPerson || 'Blood Desk Staff'}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Direct Phone:</span>
            <strong className="text-[#202124]">{hospital.phone}</strong>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="pt-2 border-t border-[#E5E1DC]/60">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onSelect && onSelect(hospital)}
        >
          View Facility & Inventory
        </Button>
      </div>
    </Card>
  );
};
