import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const HospitalProfile: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Facility details saved!', 'success');
  };

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="hospital" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-[#202124]">Hospital Facility Details</h1>
          <StatusBadge status="verified" />
        </div>
        <form onSubmit={handleSave} className="bg-white p-6 rounded-card border border-[#E5E1DC] max-w-xl space-y-4">
          <Input label="Facility Name" defaultValue={user?.name || 'City Central Health Hospital'} />
          <Input label="Contact Email" defaultValue={user?.email || 'contact@citycentralhealth.org'} disabled />
          <Input label="Phone" defaultValue={user?.phone || '+1 (555) 234-5678'} />
          <Input label="Address" defaultValue="742 Evergreen Terrace, Sector 4, New York" />
          <Button variant="primary" type="submit">Update Facility Settings</Button>
        </form>
      </main>
      <MobileNavbar role="hospital" />
    </div>
  );
};
