import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { Check, ArrowLeft, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const RequestBloodFlow: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bloodGroup: 'O+',
    unitsRequired: 2,
    hospitalName: 'City Central Health Hospital',
    hospitalAddress: '742 Evergreen Terrace, Sector 4',
    city: 'New York',
    urgency: 'HIGH',
    requesterName: 'Alex Rivera',
    requesterPhone: '+1 (555) 900-1122',
    additionalNotes: 'Urgent transfusion required. Contact desk on arrival.',
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post('/requests', formData);
      showToast('Blood request created successfully! Smart matching algorithm initiated.', 'success');
      navigate('/patient/track-request');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error submitting request', 'error');
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    '1. Requirement',
    '2. Hospital & Location',
    '3. Urgency Level',
    '4. Summary & Review',
    '5. Matching Dispatch',
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="patient" />
      <main className="flex-1 p-4 md:p-8 space-y-8 pb-20 md:pb-8 max-w-4xl">
        
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">Request Blood Wizard</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#202124]">Create Emergency Blood Request</h1>
          <p className="text-xs text-[#667085]">Step-by-step dispatch workflow to alert nearby verified donors.</p>
        </div>

        {/* Progress Tracker Bar */}
        <div className="bg-white border border-[#E5E1DC] rounded-card p-4 shadow-subtle">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {stepsList.map((stLabel, idx) => {
              const stepNum = idx + 1;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <div
                  key={stLabel}
                  className={`py-2 px-1 rounded-control font-semibold transition-all ${
                    isDone
                      ? 'bg-[#EBF6F3] text-[#27836A]'
                      : isActive
                      ? 'bg-[#7F1D3A] text-white shadow-subtle'
                      : 'bg-[#FAF9F6] text-[#667085]'
                  }`}
                >
                  <div className="text-[10px] uppercase">{stLabel}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content Container */}
        <div className="bg-white border border-[#E5E1DC] rounded-card p-6 md:p-8 shadow-subtle space-y-6">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#202124] border-b border-[#E5E1DC] pb-2">
                Step 1: Blood Requirement Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Required Blood Group *"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  options={[
                    { label: 'O- (Universal Donor)', value: 'O-' },
                    { label: 'O+ (Positive)', value: 'O+' },
                    { label: 'A+ (Positive)', value: 'A+' },
                    { label: 'A- (Negative)', value: 'A-' },
                    { label: 'B+ (Positive)', value: 'B+' },
                    { label: 'B- (Negative)', value: 'B-' },
                    { label: 'AB+ (Positive)', value: 'AB+' },
                    { label: 'AB- (Negative)', value: 'AB-' },
                  ]}
                />
                <Input
                  label="Units Required *"
                  type="number"
                  min={1}
                  max={20}
                  value={formData.unitsRequired}
                  onChange={(e) => setFormData({ ...formData, unitsRequired: parseInt(e.target.value, 10) || 1 })}
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#202124] border-b border-[#E5E1DC] pb-2">
                Step 2: Hospital & Location Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Hospital / Medical Facility Name *"
                  placeholder="e.g. City Central Health Hospital"
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                />
                <Input
                  label="Hospital Street Address"
                  placeholder="e.g. 742 Evergreen Terrace, Sector 4"
                  value={formData.hospitalAddress}
                  onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
                />
                <Input
                  label="City / Region *"
                  placeholder="e.g. New York"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#202124] border-b border-[#E5E1DC] pb-2">
                Step 3: Priority & Urgency Rating
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Urgency Level *"
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  options={[
                    { label: 'CRITICAL (Immediate Trauma / ICU)', value: 'CRITICAL' },
                    { label: 'URGENT (Surgery within 6h)', value: 'URGENT' },
                    { label: 'HIGH (Transfusion within 24h)', value: 'HIGH' },
                    { label: 'NORMAL (Scheduled Transfusion)', value: 'NORMAL' },
                  ]}
                />
                <Input
                  label="Contact Phone Number *"
                  value={formData.requesterPhone}
                  onChange={(e) => setFormData({ ...formData, requesterPhone: e.target.value })}
                />
              </div>
              <Input
                label="Additional Medical / Arrival Notes"
                placeholder="e.g. Room number, doctor name, special donor instructions"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#202124] border-b border-[#E5E1DC] pb-2">
                Step 4: Review Requirement Summary
              </h3>
              <div className="bg-[#FAF9F6] border border-[#E5E1DC] p-4 rounded-control space-y-3 text-xs">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-[#667085]">Blood Group & Units:</span>
                  <strong className="text-[#7F1D3A]">{formData.bloodGroup} ({formData.unitsRequired} Units)</strong>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-[#667085]">Hospital Facility:</span>
                  <strong className="text-[#202124]">{formData.hospitalName}, {formData.city}</strong>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-[#667085]">Urgency Rating:</span>
                  <strong className="text-[#C94B4B]">{formData.urgency} Priority</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Contact Phone:</span>
                  <strong className="text-[#202124]">{formData.requesterPhone}</strong>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E5E1DC] text-[#7F1D3A] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#202124]">Ready to Dispatch Request</h3>
              <p className="text-xs text-[#667085] max-w-md mx-auto">
                Clicking submit will execute the BloodLink smart matching algorithm to find compatible available donors nearby and notify partner hospitals.
              </p>
            </div>
          )}

          {/* Nav Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5E1DC]">
            {step > 1 ? (
              <Button variant="outline" size="sm" onClick={prevStep} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
            ) : <div />}

            {step < 5 ? (
              <Button variant="primary" size="sm" onClick={nextStep} icon={<ArrowRight className="w-4 h-4" />}>
                Next Step
              </Button>
            ) : (
              <Button variant="primary" size="lg" onClick={handleSubmit} isLoading={loading}>
                Submit & Find Donors
              </Button>
            )}
          </div>

        </div>

      </main>
      <MobileNavbar role="patient" />
    </div>
  );
};
