import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { NotificationCard } from '../../components/cards/NotificationCard';
import { NotificationItem } from '../../types';
import { api } from '../../services/api';
import { Bell } from 'lucide-react';

export const DonorNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const fetchNotifs = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const markRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="donor" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-[#202124]">Notification Center</h1>
          <p className="text-xs text-[#667085]">Real-time alerts regarding emergency requests and reminders.</p>
        </div>

        <div className="space-y-3 max-w-2xl">
          {notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onMarkRead={markRead}
            />
          ))}
        </div>
      </main>
      <MobileNavbar role="donor" />
    </div>
  );
};
