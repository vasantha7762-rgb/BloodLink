import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { ProgressTracker } from '../../components/ui/ProgressTracker';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { BloodRequest, Donor } from '../../types';
import { api } from '../../services/api';
import { Hospital, MapPin, Phone, ShieldCheck, UserCheck, Clock, CheckCircle2 } from 'lucide-react';

export const TrackRequest: React.FC = () => {
  const [request, setRequest] = useState<BloodRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await api.get('/requests');
        if (res.data && res.data.length > 0) {
          const reqDetail = await api.get(`/requests/${res.data[0].id}`);
          setRequest(reqDetail.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="patient" />
      <main className="flex-1 p-4 md:p-8 space-y-8 pb-20 md:pb-8">
        
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">Real-Time Tracking</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#202124]">Track Request Progress</h1>
          <p className="text-xs text-[#667085]">Monitor donor responses, hospital coordination, and live donation stage.</p>
        </div>

        {request ? (
          <div className="space-y-8">
            
            {/* Stage Progress Tracker Card */}
            <div className="bg-white border border-[#E5E1DC] rounded-card p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E1DC] pb-4">
                <div>
                  <h3 className="font-bold text-base text-[#202124]">
                    {request.bloodGroup} Blood Request ({request.unitsRequired} Units)
                  </h3>
                  <p className="text-xs text-[#667085]">Reference ID: {request.id}</p>
                </div>
                <StatusBadge status={request.status} />
              </div>

              <ProgressTracker currentStatus={request.status} />
            </div>

            {/* Bottom 3 Grid Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Request Details */}
              <div className="lg:col-span-4 bg-white border border-[#E5E1DC] rounded-card p-6 shadow-subtle space-y-4">
                <h4 className="font-bold text-sm text-[#202124] border-b border-[#E5E1DC] pb-2">
                  Request Specifications
                </h4>
                <div className="space-y-2 text-xs text-[#667085]">
                  <div className="flex justify-between">
                    <span>Blood Group:</span>
                    <strong className="text-[#7F1D3A] font-bold">{request.bloodGroup}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Units:</span>
                    <strong className="text-[#202124]">{request.unitsRequired}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgency Level:</span>
                    <StatusBadge status={request.urgency} size="sm" />
                  </div>
                  <div className="flex justify-between">
                    <span>Requested By:</span>
                    <strong className="text-[#202124]">{request.requesterName}</strong>
                  </div>
                </div>
              </div>

              {/* Matched Donors */}
              <div className="lg:col-span-4 bg-white border border-[#E5E1DC] rounded-card p-6 shadow-subtle space-y-4">
                <h4 className="font-bold text-sm text-[#202124] border-b border-[#E5E1DC] pb-2 flex items-center justify-between">
                  <span>Matched Donors ({request.matchedDonorDetails?.length || 0})</span>
                  <UserCheck className="w-4 h-4 text-[#27836A]" />
                </h4>
                <div className="space-y-2">
                  {request.acceptedDonorDetail ? (
                    <div className="bg-[#EBF6F3] border border-[#27836A]/30 p-3 rounded-control text-xs space-y-1">
                      <span className="text-[10px] font-bold text-[#27836A] uppercase block">Accepted Donor:</span>
                      <strong className="text-[#202124] text-sm block">{request.acceptedDonorDetail.name}</strong>
                      <p className="text-[#667085]">Group: {request.acceptedDonorDetail.bloodGroup} • Phone: {request.acceptedDonorDetail.phone}</p>
                    </div>
                  ) : request.matchedDonorDetails && request.matchedDonorDetails.length > 0 ? (
                    request.matchedDonorDetails.slice(0, 3).map((d) => (
                      <div key={d.id} className="bg-[#FAF9F6] border border-[#E5E1DC] p-2.5 rounded-control text-xs flex items-center justify-between">
                        <div>
                          <strong className="text-[#202124]">{d.name}</strong>
                          <span className="text-[#667085] block text-[11px]">{d.bloodGroup} • {d.city}</span>
                        </div>
                        <StatusBadge status={d.availability} size="sm" />
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#667085]">Smart matching engine is scanning nearby donors...</p>
                  )}
                </div>
              </div>

              {/* Hospital Information */}
              <div className="lg:col-span-4 bg-white border border-[#E5E1DC] rounded-card p-6 shadow-subtle space-y-4">
                <h4 className="font-bold text-sm text-[#202124] border-b border-[#E5E1DC] pb-2 flex items-center gap-2">
                  <Hospital className="w-4 h-4 text-[#7F1D3A]" />
                  Facility Desk
                </h4>
                <div className="space-y-2 text-xs text-[#667085]">
                  <p className="font-bold text-[#202124] text-sm">{request.hospitalName}</p>
                  <p>{request.hospitalAddress}</p>
                  <div className="pt-2 border-t border-[#E5E1DC]/60 flex items-center gap-2 text-[#27836A] font-semibold">
                    <ShieldCheck className="w-4 h-4" /> Verified Transfusion Center
                  </div>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="bg-white p-8 rounded-card border border-[#E5E1DC] text-center text-xs text-[#667085]">
            No active tracking requests found.
          </div>
        )}

      </main>
      <MobileNavbar role="patient" />
    </div>
  );
};
