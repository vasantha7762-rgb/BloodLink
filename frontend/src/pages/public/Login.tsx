import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { ShieldCheck, ArrowRight, KeyRound } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      showToast(`Welcome back, ${res.data.user.name}!`, 'success');

      // Navigate based on user role
      switch (res.data.user.role) {
        case 'donor':
          navigate('/donor/dashboard');
          break;
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'hospital':
          navigate('/hospital/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Invalid email or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center my-6">
      <div className="w-full max-w-5xl bg-white border border-[#E5E1DC] rounded-section shadow-card grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT: Auth Form */}
        <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between space-y-8">
          <div>
            <Logo size="md" />
            <div className="mt-8 space-y-2">
              <h2 className="text-2xl font-bold text-[#202124]">Welcome back.</h2>
              <p className="text-xs text-[#667085]">
                Enter your credentials to access your BloodLink account.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. donor@bloodlink.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#667085]">
                <input type="checkbox" className="rounded border-[#E5E1DC] text-[#7F1D3A] focus:ring-[#7F1D3A]" />
                <span>Remember me</span>
              </label>
              <span className="text-[#7F1D3A] font-semibold cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            <Button variant="primary" size="lg" type="submit" isLoading={loading} className="w-full">
              Sign In
            </Button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div className="bg-[#FAF9F6] border border-[#E5E1DC] p-3.5 rounded-control space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#667085] tracking-wider block">
              Quick Demo Accounts (Click to Fill):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLogin('donor@bloodlink.org')}
                className="px-2 py-1 bg-white border border-[#E5E1DC] rounded text-left hover:border-[#7F1D3A] truncate font-medium text-[#202124]"
              >
                Donor: donor@bloodlink.org
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('patient@bloodlink.org')}
                className="px-2 py-1 bg-white border border-[#E5E1DC] rounded text-left hover:border-[#7F1D3A] truncate font-medium text-[#202124]"
              >
                Patient: patient@bloodlink.org
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('contact@citycentralhealth.org')}
                className="px-2 py-1 bg-white border border-[#E5E1DC] rounded text-left hover:border-[#7F1D3A] truncate font-medium text-[#202124]"
              >
                Hospital: contact@citycentral...
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@bloodlink.org')}
                className="px-2 py-1 bg-white border border-[#E5E1DC] rounded text-left hover:border-[#7F1D3A] truncate font-medium text-[#202124]"
              >
                Admin: admin@bloodlink.org
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-[#667085]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#7F1D3A] font-bold hover:underline">
              Create an Account
            </Link>
          </div>
        </div>

        {/* RIGHT: Brand Visual */}
        <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-[#7F1D3A] via-[#4A2545] to-[#202124] p-12 text-white flex-col justify-between relative overflow-hidden">
          {/* Subtle Abstract SVG lines */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
              <path d="M50 100 C 150 300, 350 100, 450 400" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M0 250 Q 250 0, 500 250 T 1000 250" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/70 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Healthcare Technology Network
            </span>
          </div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
              Intelligent Coordination for Life-Saving Care.
            </h3>
            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              Connecting donors, patients, and certified medical blood banks through precision real-time algorithms.
            </p>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/20 flex items-center gap-3 text-xs text-white/70">
            <ShieldCheck className="w-4 h-4 text-[#27836A]" />
            <span>Secure Enterprise Authentication & Role Management</span>
          </div>
        </div>

      </div>
    </div>
  );
};
