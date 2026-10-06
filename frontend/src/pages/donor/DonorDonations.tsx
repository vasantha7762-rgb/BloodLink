import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Table, Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { CalendarCheck, ShieldCheck } from 'lucide-react';

interface DonationRecord {
  id: string;
  date: string;
  hospital: string;
  units: number;
  bloodGroup: string;
  status: string;
}

export const DonorDonations: React.FC = () => {
  const donations: DonationRecord[] = [
    { id: 'don_101', date: '2026-06-15', hospital: 'City Central Health Hospital', units: 1, bloodGroup: 'O-', status: 'Completed' },
    { id: 'don_102', date: '2026-04-10', hospital: 'St. Jude Medical Center', units: 1, bloodGroup: 'O-', status: 'Completed' },
    { id: 'don_103', date: '2026-01-22', hospital: 'Metro General Healthcare', units: 1, bloodGroup: 'O-', status: 'Completed' },
    { id: 'don_104', date: '2025-11-05', hospital: 'City Central Health Hospital', units: 1, bloodGroup: 'O-', status: 'Completed' },
  ];

  const columns: Column<DonationRecord>[] = [
    { header: 'Donation ID', accessor: 'id' },
    { header: 'Date', accessor: 'date' },
    { header: 'Hospital Center', accessor: 'hospital' },
    { header: 'Blood Group', accessor: 'bloodGroup' },
    { header: 'Units', accessor: 'units' },
    {
      header: 'Status',
      render: (item) => <StatusBadge status={item.status} size="sm" />,
    },
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="donor" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-[#202124]">My Donation History</h1>
          <p className="text-xs text-[#667085]">Verified medical record of your contributions.</p>
        </div>

        <Table
          columns={columns}
          data={donations}
          keyExtractor={(item) => item.id}
        />
      </main>
      <MobileNavbar role="donor" />
    </div>
  );
};
