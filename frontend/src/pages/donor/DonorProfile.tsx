import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const DonorProfile: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="donor" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-[#202124]">Donor Profile Settings</h1>
          <p className="text-xs text-[#667085]">Update your contact information and blood donor profile.</p>
        </div>

        <form onSubmit={handleSave} className="bg-white p-6 rounded-card border border-[#E5E1DC] max-w-xl space-y-4">
          <Input label="Full Name" defaultValue={user?.name} />
          <Input label="Email Address" defaultValue={user?.email} disabled />
          <Input label="Phone Number" defaultValue={user?.phone || '+1 (555) 019-2831'} />
          <Input label="City" defaultValue="New York" />
          <Button variant="primary" type="submit">Save Changes</Button>
        </form>
      </main>
      <MobileNavbar role="donor" />
    </div>
  );
};
