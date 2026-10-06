import React from 'react';
import { UserPlus, Cpu, Bell, Hospital, Heart, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    icon: UserPlus,
    title: '1. Patient Request',
    desc: 'Patient or hospital submits blood requirement details with group, units, location, and urgency.',
  },
  {
    icon: Cpu,
    title: '2. Smart Matching',
    desc: 'BloodLink algorithms calculate compatibility, distance, availability, and emergency priority.',
  },
  {
    icon: Bell,
    title: '3. Donor Response',
    desc: 'Nearby verified donors are notified instantly via dashboard & alerts to review and accept requests.',
  },
  {
    icon: Hospital,
    title: '4. Hospital Coordination',
    desc: 'Hospital blood bank staff verifies eligibility, schedules appointment, and coordinates arrival.',
  },
  {
    icon: Heart,
    title: '5. Safe Donation',
    desc: 'Blood donation takes place under certified medical supervision at connected health centers.',
  },
  {
    icon: CheckCircle2,
    title: '6. Live Completion',
    desc: 'Status updates automatically across all dashboards and inventory is refreshed instantly.',
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="relative border-l-2 border-[#7F1D3A]/20 ml-4 md:ml-8 pl-6 md:pl-8 space-y-8 my-8">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        return (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[35px] md:-left-[43px] top-0.5 w-8 h-8 rounded-full bg-white border-2 border-[#7F1D3A] text-[#7F1D3A] flex items-center justify-center shadow-subtle group-hover:bg-[#7F1D3A] group-hover:text-white transition-all duration-200">
              <Icon className="w-4 h-4" />
            </div>
            <div className="bg-white p-5 rounded-card border border-[#E5E1DC] shadow-subtle hover:border-[#7F1D3A]/30 transition-all">
              <h4 className="font-bold text-base text-[#202124]">{step.title}</h4>
              <p className="text-sm text-[#667085] mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
