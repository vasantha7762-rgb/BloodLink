import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Table, Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Hospital } from '../../types';
import { api } from '../../services/api';

export const AdminHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    api.get('/hospitals').then(res => setHospitals(res.data)).catch(console.error);
  }, []);

  const columns: Column<Hospital>[] = [
    { header: 'Hospital Name', accessor: 'name' },
    { header: 'City', accessor: 'city' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Contact Person', accessor: 'contactPerson' },
    { header: 'Verification', render: (h) => <StatusBadge status={h.verificationStatus} size="sm" /> },
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">Registered Partner Hospitals</h1>
        <Table columns={columns} data={hospitals} keyExtractor={(h) => h.id} />
      </main>
      <MobileNavbar role="admin" />
    </div>
  );
};
