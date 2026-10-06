import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../../types';
import { LayoutDashboard, Heart, Activity, Bell, User, PlusCircle, Package } from 'lucide-react';

interface MobileNavbarProps {
  role: UserRole;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ role }) => {
  const location = useLocation();

  const getBottomNavItems = () => {
    switch (role) {
      case 'donor':
        return [
          { label: 'Home', path: '/donor/dashboard', icon: LayoutDashboard },
          { label: 'Requests', path: '/donor/requests', icon: Heart },
          { label: 'Notifications', path: '/donor/notifications', icon: Bell },
          { label: 'Profile', path: '/donor/profile', icon: User },
        ];
      case 'patient':
        return [
          { label: 'Home', path: '/patient/dashboard', icon: LayoutDashboard },
          { label: 'New Request', path: '/patient/request-blood', icon: PlusCircle },
          { label: 'Track', path: '/patient/track-request', icon: Activity },
          { label: 'Profile', path: '/patient/profile', icon: User },
        ];
      case 'hospital':
        return [
          { label: 'Home', path: '/hospital/dashboard', icon: LayoutDashboard },
          { label: 'Requests', path: '/hospital/requests', icon: Heart },
          { label: 'Inventory', path: '/hospital/inventory', icon: Package },
          { label: 'Profile', path: '/hospital/profile', icon: User },
        ];
      case 'admin':
        return [
          { label: 'Home', path: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'Users', path: '/admin/users', icon: User },
          { label: 'Requests', path: '/admin/requests', icon: Heart },
          { label: 'Reports', path: '/admin/reports', icon: Activity },
        ];
      default:
        return [];
    }
  };

  const items = getBottomNavItems();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E1DC] shadow-dropdown px-2 py-2 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-1 px-3 rounded-control text-[11px] font-semibold transition-all ${
              isActive ? 'text-[#7F1D3A]' : 'text-[#667085]'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#7F1D3A]' : 'text-[#667085]'}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
