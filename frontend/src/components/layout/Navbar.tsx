import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, LayoutDashboard, Menu, X, Bell } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Find Blood', path: '/find-blood' },
    { label: 'Become a Donor', path: '/become-donor' },
    { label: 'Hospitals', path: '/hospitals' },
    { label: 'Emergency', path: '/emergency-requests' },
    { label: 'About', path: '/about' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'donor':
        return '/donor/dashboard';
      case 'patient':
        return '/patient/dashboard';
      case 'hospital':
        return '/hospital/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E5E1DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white border border-[#E5E1DC] px-3 py-1.5 rounded-full shadow-subtle">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-150 relative ${
                  isActive
                    ? 'text-[#7F1D3A] bg-[#FDF2F4] font-bold'
                    : 'text-[#667085] hover:text-[#202124] hover:bg-[#FAF9F6]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#7F1D3A]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(getDashboardPath())}
                icon={<LayoutDashboard className="w-4 h-4 text-[#7F1D3A]" />}
              >
                Dashboard ({user.role.toUpperCase()})
              </Button>
              <button
                onClick={logout}
                title="Log out"
                className="p-2 text-[#667085] hover:text-[#C94B4B] hover:bg-white border border-transparent hover:border-[#E5E1DC] rounded-control transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Create Account
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger button */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <button
              onClick={() => navigate(getDashboardPath())}
              className="p-2 text-[#7F1D3A] bg-white border border-[#E5E1DC] rounded-control text-xs font-bold"
            >
              Portal
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#202124] hover:bg-white rounded-control border border-[#E5E1DC]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E1DC] px-4 py-4 space-y-2 shadow-dropdown animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-control text-sm font-semibold transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#FDF2F4] text-[#7F1D3A] font-bold'
                  : 'text-[#667085] hover:bg-[#FAF9F6] hover:text-[#202124]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#E5E1DC] flex flex-col gap-2">
            {user ? (
              <>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(getDashboardPath());
                  }}
                  icon={<LayoutDashboard className="w-4 h-4" />}
                >
                  Go to {user.role.toUpperCase()} Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  icon={<LogOut className="w-4 h-4" />}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
