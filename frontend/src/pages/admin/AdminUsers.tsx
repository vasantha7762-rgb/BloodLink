import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Table, Column } from '../../components/ui/Table';
import { User } from '../../types';
import { api } from '../../services/api';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('/admin/users').then(res => setUsers(res.data)).catch(console.error);
  }, []);

  const columns: Column<User>[] = [
    { header: 'User ID', accessor: 'id' },
    { header: 'Full Name', accessor: 'name' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'Role', render: (u) => <span className="font-bold text-[#7F1D3A] uppercase text-xs">{u.role}</span> },
    { header: 'Phone', accessor: 'phone' },
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">User Accounts Management</h1>
        <Table columns={columns} data={users} keyExtractor={(u) => u.id} />
      </main>
      <MobileNavbar role="admin" />
    </div>
  );
};
