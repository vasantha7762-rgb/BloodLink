import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Heart,
  CalendarCheck,
  ToggleLeft,
  Bell,
  User,
  PlusCircle,
  Activity,
  History,
  Building2,
  Package,
  Users,
  FileBarChart,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  role: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    switch (role) {
      case 'donor':
        return [
          { label: 'Overview', path: '/donor/dashboard', icon: LayoutDashboard },
          { label: 'Requests', path: '/donor/requests', icon: Heart },
          { label: 'My Donations', path: '/donor/donations', icon: CalendarCheck },
          { label: 'Availability', path: '/donor/availability', icon: ToggleLeft },
          { label: 'Notifications', path: '/donor/notifications', icon: Bell },
          { label: 'Profile', path: '/donor/profile', icon: User },
        ];
      case 'patient':
        return [
          { label: 'Overview', path: '/patient/dashboard', icon: LayoutDashboard },
          { label: 'Request Blood', path: '/patient/request-blood', icon: PlusCircle },
          { label: 'Track Request', path: '/patient/track-request', icon: Activity },
          { label: 'History', path: '/patient/history', icon: History },
          { label: 'Notifications', path: '/patient/notifications', icon: Bell },
          { label: 'Profile', path: '/patient/profile', icon: User },
        ];
      case 'hospital':
        return [
          { label: 'Overview', path: '/hospital/dashboard', icon: LayoutDashboard },
          { label: 'Blood Requests', path: '/hospital/requests', icon: Heart },
          { label: 'Inventory', path: '/hospital/inventory', icon: Package },
          { label: 'Donors', path: '/hospital/donors', icon: Users },
          { label: 'Reports', path: '/hospital/reports', icon: FileBarChart },
          { label: 'Profile', path: '/hospital/profile', icon: Building2 },
        ];
      case 'admin':
        return [
          { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'Users', path: '/admin/users', icon: Users },
          { label: 'Donors', path: '/admin/donors', icon: Heart },
          { label: 'Patients', path: '/admin/patients', icon: User },
          { label: 'Hospitals', path: '/admin/hospitals', icon: Building2 },
          { label: 'Blood Requests', path: '/admin/requests', icon: Activity },
          { label: 'Inventory', path: '/admin/inventory', icon: Package },
          { label: 'Reports', path: '/admin/reports', icon: FileBarChart },
          { label: 'Settings', path: '/admin/settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-white border-r border-[#E5E1DC] min-h-[calc(100vh-5rem)] p-4 flex flex-col justify-between shrink-0 hidden md:flex">
      <div className="space-y-6">
        {/* User Card Header */}
        <div className="bg-[#FAF9F6] border border-[#E5E1DC] p-3.5 rounded-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#7F1D3A] text-white flex items-center justify-center font-bold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#202124] truncate">{user?.name || 'User'}</span>
            <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider">
              {role} Portal
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085] px-3">
            Menu Navigation
          </span>
          <nav className="mt-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-control text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#7F1D3A] text-white shadow-subtle'
                      : 'text-[#667085] hover:text-[#202124] hover:bg-[#FAF9F6]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#667085]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-[#E5E1DC]">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-control text-xs font-semibold text-[#C94B4B] hover:bg-[#FDF2F2] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
