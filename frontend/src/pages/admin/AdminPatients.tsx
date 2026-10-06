import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Table, Column } from '../../components/ui/Table';
import { Patient } from '../../types';
import { api } from '../../services/api';

export const AdminPatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    api.get('/admin/users').then(res => setPatients(res.data.filter((u: any) => u.role === 'patient'))).catch(console.error);
  }, []);

  const columns: Column<Patient>[] = [
    { header: 'Patient ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">Patient Registry</h1>
        <Table columns={columns} data={patients} keyExtractor={(p) => p.id} />
      </main>
      <MobileNavbar role="admin" />
    </div>
  );
};
