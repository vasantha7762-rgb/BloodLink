import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Table, Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Donor } from '../../types';
import { api } from '../../services/api';

export const AdminDonors: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    api.get('/donors').then(res => setDonors(res.data)).catch(console.error);
  }, []);

  const columns: Column<Donor>[] = [
    { header: 'Donor ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Blood Group', render: (d) => <strong className="text-[#7F1D3A]">{d.bloodGroup}</strong> },
    { header: 'City', accessor: 'city' },
    { header: 'Donations', accessor: 'totalDonations' },
    { header: 'Status', render: (d) => <StatusBadge status={d.availability} size="sm" /> },
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">Global Donor Registry</h1>
        <Table columns={columns} data={donors} keyExtractor={(d) => d.id} />
      </main>
      <MobileNavbar role="admin" />
    </div>
  );
};
