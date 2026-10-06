import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useToast } from '../../context/ToastContext';
import { ToggleRight, Calendar } from 'lucide-react';

export const DonorAvailability: React.FC = () => {
  const { showToast } = useToast();
  const [isAvailable, setIsAvailable] = useState(true);

  const toggle = () => {
    setIsAvailable(!isAvailable);
    showToast(`Status toggled to ${!isAvailable ? 'Available' : 'Unavailable'}`, 'info');
  };

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="donor" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-[#202124]">Donor Availability</h1>
          <p className="text-xs text-[#667085]">Manage your availability status for emergency alerts.</p>
        </div>

        <div className="bg-white p-6 rounded-card border border-[#E5E1DC] max-w-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#202124]">Current Availability</h3>
              <p className="text-xs text-[#667085]">When available, nearby hospitals can match you with urgent requests.</p>
            </div>
            <StatusBadge status={isAvailable ? 'available' : 'unavailable'} />
          </div>

          <Button variant="primary" onClick={toggle} icon={<ToggleRight className="w-4 h-4" />}>
            {isAvailable ? 'Pause Availability' : 'Set Available to Donate'}
          </Button>
        </div>
      </main>
      <MobileNavbar role="donor" />
    </div>
  );
};
