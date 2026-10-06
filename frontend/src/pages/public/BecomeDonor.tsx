import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export const BecomeDonor: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: 'O+',
    city: 'New York',
    availability: 'available',
    lastDonationDate: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      await api.post('/donors', formData);
      showToast('Registration successful! Welcome to BloodLink donor network.', 'success');
      navigate('/login');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Registration failed. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">Donor Registration</span>
        <h1 className="text-3xl font-extrabold text-[#202124]">Become someone's lifeline.</h1>
        <p className="text-sm text-[#667085] max-w-xl">
          Your decision to donate can make a meaningful difference for emergency patients and surgical care.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Onboarding Form */}
        <div className="lg:col-span-8 bg-white border border-[#E5E1DC] rounded-card p-6 md:p-8 shadow-subtle space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Personal Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#7F1D3A] border-b border-[#E5E1DC] pb-2">
                1. Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  placeholder="e.g. Ravi Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="e.g. ravi@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  label="Phone Number *"
                  type="tel"
                  placeholder="e.g. +1 (555) 019-2831"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input
                  label="City / Region *"
                  placeholder="e.g. New York"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Section 2: Donation Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#7F1D3A] border-b border-[#E5E1DC] pb-2">
                2. Donation & Availability Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Blood Group *"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  options={[
                    { label: 'O+ (Positive)', value: 'O+' },
                    { label: 'O- (Universal Donor)', value: 'O-' },
                    { label: 'A+ (Positive)', value: 'A+' },
                    { label: 'A- (Negative)', value: 'A-' },
                    { label: 'B+ (Positive)', value: 'B+' },
                    { label: 'B- (Negative)', value: 'B-' },
                    { label: 'AB+ (Positive)', value: 'AB+' },
                    { label: 'AB- (Negative)', value: 'AB-' },
                  ]}
                />

                <Select
                  label="Current Availability *"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  options={[
                    { label: 'Available for Requests', value: 'available' },
                    { label: 'Temporarily Unavailable', value: 'unavailable' },
                  ]}
                />

                <Input
                  label="Last Donation Date"
                  type="date"
                  value={formData.lastDonationDate}
                  onChange={(e) => setFormData({ ...formData, lastDonationDate: e.target.value })}
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-[#E5E1DC]">
              <Button variant="primary" size="lg" type="submit" isLoading={loading} className="w-full md:w-auto">
                Register as Donor
              </Button>
            </div>
          </form>
        </div>

        {/* Side Panel: Why Donate? */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#FAF9F6] border border-[#E5E1DC] rounded-card p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#202124] flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-[#7F1D3A]" />
              Why Donate with BloodLink?
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Every donation helps maintain vital emergency supplies across connected regional hospitals.
            </p>

            <div className="space-y-3">
              <Card className="p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FDF2F4] text-[#7F1D3A] flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#202124]">Support Multiple Patients</h4>
                  <p className="text-[11px] text-[#667085] mt-0.5">
                    A single donation can be separated into components to assist multiple patients in need.
                  </p>
                </div>
              </Card>

              <Card className="p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#E5E1DC] text-[#4A2545] flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#202124]">Emergency Availability</h4>
                  <p className="text-[11px] text-[#667085] mt-0.5">
                    Regular active donors ensure hospitals can respond swiftly to unexpected critical trauma cases.
                  </p>
                </div>
              </Card>

              <Card className="p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EBF6F3] text-[#27836A] flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#202124]">Direct Nearby Matching</h4>
                  <p className="text-[11px] text-[#667085] mt-0.5">
                    Your availability connects you directly with nearby verified hospital requests.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
