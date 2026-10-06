import React from 'react';
import { Timeline } from '../../components/ui/Timeline';
import { Card } from '../../components/ui/Card';
import { ShieldCheck, HeartHandshake, Eye, Award, Cpu, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">About BloodLink</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#202124] tracking-tight leading-tight">
          Technology that brings people together when it matters most.
        </h1>
        <p className="text-base text-[#667085] leading-relaxed">
          BloodLink was built to eliminate friction in emergency blood donation, bridging the critical gap between patients, verified donors, and healthcare providers.
        </p>
      </div>

      {/* Mission, Vision, Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverEffect className="space-y-3">
          <div className="w-10 h-10 rounded-control bg-[#FDF2F4] text-[#7F1D3A] flex items-center justify-center font-bold">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-xl text-[#202124]">Our Mission</h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            To ensure zero preventable delays in life-saving blood transfusions through real-time smart matching, verified donor networks, and enterprise hospital coordination.
          </p>
        </Card>

        <Card hoverEffect className="space-y-3">
          <div className="w-10 h-10 rounded-control bg-[#FAF9F6] border border-[#E5E1DC] text-[#4A2545] flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-xl text-[#202124]">Our Vision</h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            A world where every emergency surgical request is met with instant donor matching, transparent inventory tracking, and seamless medical institution integration.
          </p>
        </Card>

        <Card hoverEffect className="space-y-3">
          <div className="w-10 h-10 rounded-control bg-[#EBF6F3] text-[#27836A] flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-xl text-[#202124]">Our Core Values</h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            Human-centered technology, medical compliance, rapid responsiveness, non-profit transparency, and uncompromised user data privacy.
          </p>
        </Card>
      </div>

      {/* How BloodLink Works Interactive Timeline */}
      <section className="bg-white border border-[#E5E1DC] rounded-section p-8 md:p-12 shadow-subtle space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#202124]">How BloodLink Operates</h2>
          <p className="text-sm text-[#667085]">
            Our multi-tiered platform coordinates every step of the emergency blood life cycle.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Timeline />
        </div>
      </section>

      {/* Trust & Verification Standards */}
      <section className="bg-[#FAF9F6] border border-[#E5E1DC] rounded-section p-8 space-y-4 text-center max-w-4xl mx-auto">
        <ShieldCheck className="w-10 h-10 text-[#27836A] mx-auto" />
        <h3 className="text-xl font-bold text-[#202124]">Enterprise Health-Tech & Security Standards</h3>
        <p className="text-xs text-[#667085] leading-relaxed max-w-2xl mx-auto">
          BloodLink adheres strictly to medical coordination guidelines. We do not substitute professional blood bank laboratory compatibility testing. All donor matches must undergo standard cross-matching at receiving certified hospital blood banks.
        </p>
      </section>
    </div>
  );
};
