import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const AdminSettings: React.FC = () => {
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Admin configuration saved successfully', 'success');
  };

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">System Settings</h1>
        <form onSubmit={handleSave} className="bg-white p-6 rounded-card border border-[#E5E1DC] max-w-xl space-y-4">
          <Input label="Platform Name" defaultValue="BloodLink Health Technologies" />
          <Input label="Max Distance Threshold (km)" defaultValue="25" />
          <Input label="Automatic Match Threshold Score" defaultValue="80" />
          <Button variant="primary" type="submit">Save Settings</Button>
        </form>
      </main>
      <MobileNavbar role="admin" />
    </div>
  );
};
