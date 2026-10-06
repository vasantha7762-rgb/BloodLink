import React from 'react';
import { NotificationItem } from '../../types';
import { AlertCircle, CheckCircle2, Bell, Info, Heart } from 'lucide-react';

interface NotificationCardProps {
  notification: NotificationItem;
  onMarkRead?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkRead,
}) => {
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'Emergency Request':
        return <AlertCircle className="w-5 h-5 text-[#C94B4B]" />;
      case 'Request Accepted':
        return <CheckCircle2 className="w-5 h-5 text-[#27836A]" />;
      case 'Donation Reminder':
        return <Heart className="w-5 h-5 text-[#7F1D3A]" />;
      case 'System Update':
        return <Info className="w-5 h-5 text-[#3F7C7A]" />;
      default:
        return <Bell className="w-5 h-5 text-[#667085]" />;
    }
  };

  return (
    <div
      onClick={() => !notification.isRead && onMarkRead && onMarkRead(notification.id)}
      className={`p-4 rounded-card border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
        !notification.isRead
          ? 'bg-[#FDF2F4] border-[#F7C5D1] shadow-subtle'
          : 'bg-white border-[#E5E1DC] opacity-80'
      }`}
    >
      <div className="p-2 rounded-full bg-white border border-[#E5E1DC] shadow-2xs shrink-0 mt-0.5">
        {getIcon(notification.type)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-sm text-[#202124]">{notification.title}</h4>
          <span className="text-[10px] font-semibold text-[#667085]">
            {notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : 'Today'}
          </span>
        </div>
        <p className="text-xs text-[#667085] mt-1 leading-relaxed">{notification.description}</p>
      </div>

      {!notification.isRead && (
        <span className="w-2.5 h-2.5 rounded-full bg-[#7F1D3A] shrink-0 mt-1" title="Unread" />
      )}
    </div>
  );
};
