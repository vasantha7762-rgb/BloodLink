import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const PatientProfile: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile updated!', 'success');
  };

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="patient" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">Patient Profile Settings</h1>
        <form onSubmit={handleSave} className="bg-white p-6 rounded-card border border-[#E5E1DC] max-w-xl space-y-4">
          <Input label="Full Name" defaultValue={user?.name || 'Alex Rivera'} />
          <Input label="Email" defaultValue={user?.email || 'patient@bloodlink.org'} disabled />
          <Input label="Phone" defaultValue={user?.phone || '+1 (555) 900-1122'} />
          <Button variant="primary" type="submit">Save Settings</Button>
        </form>
      </main>
      <MobileNavbar role="patient" />
    </div>
  );
};
