import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { NotificationCard } from '../../components/cards/NotificationCard';
import { NotificationItem } from '../../types';
import { api } from '../../services/api';

export const PatientNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    api.get('/notifications').then(res => setNotifications(res.data)).catch(console.error);
  }, []);

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="patient" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">Patient Notifications</h1>
        <div className="space-y-3 max-w-2xl">
          {notifications.map(n => (
            <NotificationCard key={n.id} notification={n} />
          ))}
        </div>
      </main>
      <MobileNavbar role="patient" />
    </div>
  );
};
