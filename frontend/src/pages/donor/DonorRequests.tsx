import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { RequestCard } from '../../components/cards/RequestCard';
import { DonorRequestModal } from '../../components/modals/DonorRequestModal';
import { BloodRequest } from '../../types';
import { api } from '../../services/api';
import { Heart } from 'lucide-react';

export const DonorRequests: React.FC = () => {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests');
      setRequests(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="donor" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-[#202124]">Blood Requests</h1>
          <p className="text-xs text-[#667085]">Review and accept active blood requests in your region.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              onSelect={(r) => setSelectedRequest(r)}
            />
          ))}
        </div>

        {selectedRequest && (
          <DonorRequestModal
            request={selectedRequest}
            isOpen={!!selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onAccepted={fetchRequests}
          />
        )}
      </main>
      <MobileNavbar role="donor" />
    </div>
  );
};
