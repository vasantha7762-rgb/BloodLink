import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { UserRole } from '../../types';
import { Heart, User, Building2, ShieldCheck, Check } from 'lucide-react';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [role, setRole] = useState<UserRole>('donor');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bloodGroup: 'O+',
    city: 'New York',
    hospitalName: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      showToast('Please complete all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', { ...formData, role });
      login(res.data.token, res.data.user);
      showToast('Account created successfully!', 'success');

      switch (role) {
        case 'donor':
          navigate('/donor/dashboard');
          break;
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'hospital':
          navigate('/hospital/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center my-6">
      <div className="w-full max-w-5xl bg-white border border-[#E5E1DC] rounded-section shadow-card grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT: Signup Form */}
        <div className="lg:col-span-7 p-8 md:p-12 space-y-6">
          <Logo size="md" />
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#202124]">Choose how you'll use BloodLink.</h2>
            <p className="text-xs text-[#667085]">
              Select your role to configure your customized dashboard.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => setRole('donor')}
              className={`p-3 rounded-card border cursor-pointer transition-all flex flex-col items-center text-center space-y-1.5 ${
                role === 'donor'
                  ? 'border-[#7F1D3A] bg-[#FDF2F4] shadow-subtle ring-1 ring-[#7F1D3A]'
                  : 'border-[#E5E1DC] hover:border-gray-400 bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${role === 'donor' ? 'text-[#7F1D3A]' : 'text-[#667085]'}`} />
              <span className="text-xs font-bold text-[#202124]">Donor</span>
              <span className="text-[10px] text-[#667085]">Donate blood</span>
            </div>

            <div
              onClick={() => setRole('patient')}
              className={`p-3 rounded-card border cursor-pointer transition-all flex flex-col items-center text-center space-y-1.5 ${
                role === 'patient'
                  ? 'border-[#7F1D3A] bg-[#FDF2F4] shadow-subtle ring-1 ring-[#7F1D3A]'
                  : 'border-[#E5E1DC] hover:border-gray-400 bg-white'
              }`}
            >
              <User className={`w-5 h-5 ${role === 'patient' ? 'text-[#7F1D3A]' : 'text-[#667085]'}`} />
              <span className="text-xs font-bold text-[#202124]">Patient</span>
              <span className="text-[10px] text-[#667085]">Request blood</span>
            </div>

            <div
              onClick={() => setRole('hospital')}
              className={`p-3 rounded-card border cursor-pointer transition-all flex flex-col items-center text-center space-y-1.5 ${
                role === 'hospital'
                  ? 'border-[#7F1D3A] bg-[#FDF2F4] shadow-subtle ring-1 ring-[#7F1D3A]'
                  : 'border-[#E5E1DC] hover:border-gray-400 bg-white'
              }`}
            >
              <Building2 className={`w-5 h-5 ${role === 'hospital' ? 'text-[#7F1D3A]' : 'text-[#667085]'}`} />
              <span className="text-xs font-bold text-[#202124]">Hospital</span>
              <span className="text-[10px] text-[#667085]">Medical facility</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                placeholder="e.g. Dr. Sarah Jenkins"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="e.g. sarah@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Password *"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Input
                label="Phone Number *"
                placeholder="e.g. +1 (555) 019-2831"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            {role === 'donor' && (
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Blood Group *"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  options={[
                    { label: 'O+ (Positive)', value: 'O+' },
                    { label: 'O- (Universal)', value: 'O-' },
                    { label: 'A+', value: 'A+' },
                    { label: 'A-', value: 'A-' },
                    { label: 'B+', value: 'B+' },
                    { label: 'B-', value: 'B-' },
                    { label: 'AB+', value: 'AB+' },
                    { label: 'AB-', value: 'AB-' },
                  ]}
                />
                <Input
                  label="City / Location *"
                  placeholder="e.g. New York"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            )}

            {role === 'hospital' && (
              <Input
                label="Hospital / Blood Bank Facility Name *"
                placeholder="e.g. City Central Health Hospital"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                required
              />
            )}

            <Button variant="primary" size="lg" type="submit" isLoading={loading} className="w-full">
              Create Account & Continue
            </Button>
          </form>

          <div className="text-center text-xs text-[#667085]">
            Already registered?{' '}
            <Link to="/login" className="text-[#7F1D3A] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        {/* RIGHT: Visual Story */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#4A2545] to-[#7F1D3A] p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Role-Based Access
            </span>
            <h3 className="text-2xl font-extrabold">Seamless Coordination Platform</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Donors receive direct emergency notifications, patients track request fulfillment in real-time, and hospitals manage inventory levels efficiently.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-xs">
              <Check className="w-4 h-4 text-[#27836A]" />
              <span>Verified Hospital Integration</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Check className="w-4 h-4 text-[#27836A]" />
              <span>Smart Distance & Compatibility Matching</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Check className="w-4 h-4 text-[#27836A]" />
              <span>Real-Time Request Lifecycle Tracking</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
