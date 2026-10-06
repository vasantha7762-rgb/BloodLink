import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { StatCard } from '../../components/ui/StatCard';
import { RequestCard } from '../../components/cards/RequestCard';
import { DonorRequestModal } from '../../components/modals/DonorRequestModal';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BloodRequest, Donor } from '../../types';
import { api } from '../../services/api';
import { Heart, CalendarCheck, MapPin, ToggleRight, Bell, CheckCircle2, RefreshCw } from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [donorProfile, setDonorProfile] = useState<Donor | null>(null);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const profileRes = await api.get('/auth/me');
      setDonorProfile(profileRes.data.user?.profile);

      const requestsRes = await api.get('/requests');
      setRequests(requestsRes.data);
    } catch (err) {
      console.error('Error loading donor dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const toggleAvailability = async () => {
    if (!donorProfile) return;
    const newStatus = donorProfile.availability === 'available' ? 'unavailable' : 'available';
    try {
      await api.put(`/donors/${donorProfile.id}/availability`, { availability: newStatus });
      setDonorProfile({ ...donorProfile, availability: newStatus });
      showToast(`Availability status updated to ${newStatus}`, 'info');
    } catch (err) {
      showToast('Error updating status', 'error');
    }
  };

  const isAvailable = donorProfile?.availability === 'available';

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="donor" />

      <main className="flex-1 p-4 md:p-8 space-y-8 pb-20 md:pb-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E5E1DC] p-6 rounded-card shadow-subtle">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">Donor Overview</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#202124]">
              Good morning, {user?.name || 'Ravi'}.
            </h1>
            <p className="text-xs text-[#667085] mt-0.5">
              Blood Group: <strong className="text-[#7F1D3A]">{donorProfile?.bloodGroup || 'O-'}</strong> • Location: {donorProfile?.city || 'New York'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#FAF9F6] border border-[#E5E1DC] px-3.5 py-2 rounded-control">
              <span className="text-xs font-semibold text-[#202124]">Status:</span>
              <StatusBadge status={donorProfile?.availability || 'available'} />
            </div>
            <Button
              variant={isAvailable ? 'outline' : 'primary'}
              size="sm"
              onClick={toggleAvailability}
              icon={<ToggleRight className="w-4 h-4" />}
            >
              {isAvailable ? 'Set Unavailable' : 'Set Available'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Donations"
            value={donorProfile?.totalDonations || 8}
            icon={<CalendarCheck className="w-5 h-5 text-[#7F1D3A]" />}
            subtitle="Verified contributions"
          />
          <StatCard
            title="Next Eligible Date"
            value="Eligible Now"
            icon={<CheckCircle2 className="w-5 h-5 text-[#27836A]" />}
            badge="Eligible"
            badgeColor="bg-[#EBF6F3] text-[#27836A]"
          />
          <StatCard
            title="Requests Nearby"
            value={requests.length}
            icon={<MapPin className="w-5 h-5 text-[#4A2545]" />}
            subtitle="Within 15 km city radius"
          />
          <StatCard
            title="Current Availability"
            value={isAvailable ? 'Active' : 'Paused'}
            icon={<Heart className="w-5 h-5 text-[#7F1D3A]" />}
            badge={isAvailable ? 'Receiving Alerts' : 'Alerts Paused'}
            badgeColor={isAvailable ? 'bg-[#EBF6F3] text-[#27836A]' : 'bg-gray-100 text-gray-600'}
          />
        </div>

        {/* Requests Near You */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#202124]">Requests Near You</h3>
              <p className="text-xs text-[#667085]">Verified emergency requirements seeking compatible donors.</p>
            </div>
            <button
              onClick={loadDashboardData}
              className="p-2 text-[#667085] hover:text-[#202124] bg-white border border-[#E5E1DC] rounded-control"
              title="Refresh requests"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {requests.slice(0, 6).map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onSelect={(selected) => setSelectedRequest(selected)}
              />
            ))}
          </div>
        </div>

        {/* Selected Request Modal */}
        {selectedRequest && (
          <DonorRequestModal
            request={selectedRequest}
            isOpen={!!selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onAccepted={loadDashboardData}
          />
        )}
      </main>

      <MobileNavbar role="donor" />
    </div>
  );
};
