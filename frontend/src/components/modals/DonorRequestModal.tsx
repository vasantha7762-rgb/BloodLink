import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { BloodRequest } from '../../types';
import { Hospital, MapPin, Droplet, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface DonorRequestModalProps {
  request: BloodRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onAccepted?: () => void;
}

export const DonorRequestModal: React.FC<DonorRequestModalProps> = ({
  request,
  isOpen,
  onClose,
  onAccepted,
}) => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!request) return null;

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      await api.post(`/requests/${request.id}/accept`);
      showToast('You have accepted this blood request! Hospital notified.', 'success');
      if (onAccepted) onAccepted();
      onClose();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Error accepting request', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecline = async () => {
    try {
      await api.post(`/requests/${request.id}/reject`);
      showToast('Request marked as not available', 'info');
      onClose();
    } catch (error) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Blood Request Details"
      subtitle={`Reference ID: ${request.id}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Urgent Header Banner */}
        <div className="bg-[#FAF9F6] border border-[#E5E1DC] rounded-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#7F1D3A] text-white flex items-center justify-center font-extrabold text-lg shadow-subtle">
              {request.bloodGroup}
            </div>
            <div>
              <h4 className="font-bold text-base text-[#202124]">{request.unitsRequired} Units Required</h4>
              <p className="text-xs text-[#667085]">Requested by {request.requesterName}</p>
            </div>
          </div>
          <StatusBadge status={request.urgency} />
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white border border-[#E5E1DC] p-3.5 rounded-control flex items-start gap-3">
            <Hospital className="w-4 h-4 text-[#7F1D3A] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#667085] block font-semibold">Hospital</span>
              <span className="font-bold text-[#202124]">{request.hospitalName}</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E1DC] p-3.5 rounded-control flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#7F1D3A] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#667085] block font-semibold">Location / City</span>
              <span className="font-bold text-[#202124]">{request.city}</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E1DC] p-3.5 rounded-control flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#7F1D3A] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#667085] block font-semibold">Time Posted</span>
              <span className="font-bold text-[#202124]">{request.timePosted || 'Recently'}</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E1DC] p-3.5 rounded-control flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#27836A] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#667085] block font-semibold">Verification</span>
              <span className="font-bold text-[#27836A]">Hospital Verified</span>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        {request.additionalNotes && (
          <div className="bg-[#FAF9F6] border border-[#E5E1DC] p-3.5 rounded-control text-xs text-[#667085]">
            <strong className="text-[#202124] block mb-1">Additional Notes:</strong>
            {request.additionalNotes}
          </div>
        )}

        {/* Medical Disclaimer */}
        <p className="text-[11px] text-[#667085] italic bg-white p-3 rounded-control border border-[#E5E1DC]">
          "BloodLink is a coordination platform. Final donor eligibility and blood transfusion compatibility must always be confirmed by qualified medical professionals."
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#E5E1DC]">
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleAccept}
            isLoading={isSubmitting}
          >
            Accept Request
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleDecline}
          >
            Not Available
          </Button>
        </div>
      </div>
    </Modal>
  );
};
