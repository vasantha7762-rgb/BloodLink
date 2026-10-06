import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Table, Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { BloodRequest } from '../../types';
import { api } from '../../services/api';

export const AdminRequests: React.FC = () => {
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    api.get('/requests').then(res => setRequests(res.data)).catch(console.error);
  }, []);

  const columns: Column<BloodRequest>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Patient', accessor: 'requesterName' },
    { header: 'Blood Group', render: (r) => <strong className="text-[#7F1D3A]">{r.bloodGroup}</strong> },
    { header: 'Units', accessor: 'unitsRequired' },
    { header: 'Hospital', accessor: 'hospitalName' },
    { header: 'Urgency', render: (r) => <StatusBadge status={r.urgency} size="sm" /> },
    { header: 'Status', render: (r) => <StatusBadge status={r.status} size="sm" /> },
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">Global Blood Requests Monitor</h1>
        <Table columns={columns} data={requests} keyExtractor={(r) => r.id} />
      </main>
      <MobileNavbar role="admin" />
    </div>
  );
};
