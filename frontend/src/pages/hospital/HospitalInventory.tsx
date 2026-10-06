import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Table, Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { BloodInventory } from '../../types';
import { api } from '../../services/api';

export const HospitalInventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<BloodInventory[]>([]);

  useEffect(() => {
    api.get('/inventory').then(res => setInventory(res.data)).catch(console.error);
  }, []);

  const columns: Column<BloodInventory>[] = [
    { header: 'Blood Group', render: (i) => <strong className="text-[#7F1D3A]">{i.bloodGroup}</strong> },
    { header: 'Available Units', accessor: 'availableUnits' },
    { header: 'Minimum Safety Level', accessor: 'minimumLevel' },
    { header: 'Status', render: (i) => <StatusBadge status={i.status} size="sm" /> },
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="hospital" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">Blood Inventory Management</h1>
        <Table columns={columns} data={inventory} keyExtractor={(i) => i.id} />
      </main>
      <MobileNavbar role="hospital" />
    </div>
  );
};
