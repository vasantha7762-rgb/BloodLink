import React, { useState, useEffect } from 'react';
import { Select } from '../../components/ui/Select';
import { RequestCard } from '../../components/cards/RequestCard';
import { DonorRequestModal } from '../../components/modals/DonorRequestModal';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import { BloodRequest, RequestUrgency } from '../../types';
import { api } from '../../services/api';
import { AlertTriangle, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const EmergencyRequests: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [urgency, setUrgency] = useState<string>('All');
  const [bloodGroup, setBloodGroup] = useState<string>('All');
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (urgency !== 'All') params.append('urgency', urgency);
      if (bloodGroup !== 'All') params.append('bloodGroup', bloodGroup);

      const res = await api.get(`/requests?${params.toString()}`);
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching emergency requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [urgency, bloodGroup]);

  const handleSelectRequest = (req: BloodRequest) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedRequest(req);
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C94B4B] flex items-center gap-1">
          <AlertTriangle className="w-4 h-4" /> Priority Alert Network
        </span>
        <h1 className="text-3xl font-extrabold text-[#202124]">Emergency Requests</h1>
        <p className="text-sm text-[#667085] max-w-xl">
          Urgent blood requirements that need immediate donor attention and hospital coordination.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#E5E1DC] rounded-card p-4 shadow-subtle grid grid-cols-1 sm:grid-cols-3 gap-4 items-center max-w-2xl">
        <Select
          label="Filter by Urgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          options={[
            { label: 'All Urgency Levels', value: 'All' },
            { label: 'CRITICAL Priority Only', value: 'CRITICAL' },
            { label: 'URGENT Priority', value: 'URGENT' },
            { label: 'HIGH Priority', value: 'HIGH' },
            { label: 'NORMAL Priority', value: 'NORMAL' },
          ]}
        />

        <Select
          label="Filter by Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          options={[
            { label: 'All Blood Groups', value: 'All' },
            { label: 'O-', value: 'O-' },
            { label: 'O+', value: 'O+' },
            { label: 'A+', value: 'A+' },
            { label: 'A-', value: 'A-' },
            { label: 'B+', value: 'B+' },
            { label: 'B-', value: 'B-' },
            { label: 'AB+', value: 'AB+' },
            { label: 'AB-', value: 'AB-' },
          ]}
        />

        <div className="text-xs text-[#667085] pt-5 font-semibold">
          Showing {requests.length} active request(s)
        </div>
      </div>

      {/* Request Grid */}
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              onSelect={handleSelectRequest}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Emergency Requests"
          description="There are currently no active blood requests matching the selected urgency or blood group filter."
        />
      )}

      {/* Request Detail Modal */}
      {selectedRequest && (
        <DonorRequestModal
          request={selectedRequest}
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onAccepted={() => fetchRequests()}
        />
      )}
    </div>
  );
};
