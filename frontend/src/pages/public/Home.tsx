import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Timeline } from '../../components/ui/Timeline';
import { RequestCard } from '../../components/cards/RequestCard';
import { BloodRequest } from '../../types';
import { api } from '../../services/api';
import {
  Search,
  HeartHandshake,
  Building2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  Activity
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [emergencyRequests, setEmergencyRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/requests?urgency=CRITICAL');
        setEmergencyRequests(res.data.slice(0, 3));
      } catch (e) {
        console.error('Error fetching emergency preview:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 rounded-section bg-[#FAF9F6] border border-[#E5E1DC]/60 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E1DC] shadow-subtle text-xs font-semibold text-[#667085]">
              <ShieldCheck className="w-4 h-4 text-[#27836A]" />
              <span>Trusted coordination for donors, patients & healthcare providers</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#202124] tracking-tight leading-[1.15]">
              Every Connection <br />
              <span className="text-[#7F1D3A]">Can Save a Life.</span>
            </h1>

            <p className="text-base md:text-lg text-[#667085] max-w-xl leading-relaxed">
              BloodLink connects donors, patients, hospitals and blood banks through one intelligent platform. Rapid matching when seconds count.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/find-blood')}
                icon={<Search className="w-5 h-5" />}
              >
                Find Blood
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/become-donor')}
                icon={<HeartHandshake className="w-5 h-5" />}
              >
                Become a Donor
              </Button>
            </div>

            {/* Micro Stats */}
            <div className="pt-6 border-t border-[#E5E1DC] grid grid-cols-3 gap-4 max-w-md text-xs">
              <div>
                <strong className="block text-xl font-bold text-[#202124]">10,000+</strong>
                <span className="text-[#667085]">Registered Donors</span>
              </div>
              <div>
                <strong className="block text-xl font-bold text-[#202124]">250+</strong>
                <span className="text-[#667085]">Partner Hospitals</span>
              </div>
              <div>
                <strong className="block text-xl font-bold text-[#7F1D3A]">99.4%</strong>
                <span className="text-[#667085]">Fulfillment Rate</span>
              </div>
            </div>
          </div>

          {/* Right Healthcare Visual Representation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full aspect-square max-w-md rounded-section bg-gradient-to-br from-[#7F1D3A]/5 via-white to-[#4A2545]/5 border border-[#E5E1DC] shadow-card p-6 flex flex-col justify-between relative overflow-hidden">
              
              {/* Abstract Connection Network Graphic */}
              <div className="absolute inset-0 opacity-25 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="140" stroke="#7F1D3A" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="200" cy="200" r="90" stroke="#4A2545" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M100 120 L200 200 L300 140 M200 200 L260 280 M200 200 L120 290" stroke="#7F1D3A" strokeWidth="1.5" opacity="0.6" />
                </svg>
              </div>

              {/* Floating Cards */}
              <div className="relative z-10 bg-white p-4 rounded-card border border-[#E5E1DC] shadow-subtle flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EBF6F3] text-[#27836A] flex items-center justify-center font-bold">
                  O-
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#202124]">Smart Matching Active</h4>
                  <p className="text-[11px] text-[#667085]">Matched 3 verified donors nearby</p>
                </div>
              </div>

              <div className="relative z-10 my-4 bg-white p-4 rounded-card border border-[#E5E1DC] shadow-subtle flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E5E1DC] text-[#7F1D3A] flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#202124]">City Central Hospital</h4>
                    <p className="text-[11px] text-[#27836A]">Verified Partner Facility</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#7F1D3A] bg-[#FDF2F4] px-2.5 py-1 rounded-full">
                  Stock Healthy
                </span>
              </div>

              <div className="relative z-10 bg-white p-4 rounded-card border border-[#E5E1DC] shadow-subtle flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FDF2F2] text-[#C94B4B] flex items-center justify-center font-bold">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#202124]">Emergency Prioritization</h4>
                  <p className="text-[11px] text-[#667085]">Average response time &lt; 14 minutes</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Four Feature Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#202124]">
            Designed for Every Healthcare Role
          </h2>
          <p className="text-sm text-[#667085]">
            Integrated services for donors, emergency seekers, and medical institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hoverEffect className="flex flex-col justify-between space-y-4" onClick={() => navigate('/find-blood')}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-control bg-[#FDF2F4] text-[#7F1D3A] flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#202124]">Find Blood</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Discover compatible donors near you through location and group filtering.
              </p>
            </div>
            <span className="text-xs font-bold text-[#7F1D3A] flex items-center gap-1 group">
              Search Donors <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Card>

          <Card hoverEffect className="flex flex-col justify-between space-y-4" onClick={() => navigate('/become-donor')}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-control bg-[#FAF9F6] border border-[#E5E1DC] text-[#4A2545] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#202124]">Become a Donor</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Turn your availability into someone's second chance with verified donor onboarding.
              </p>
            </div>
            <span className="text-xs font-bold text-[#4A2545] flex items-center gap-1">
              Register Today <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Card>

          <Card hoverEffect className="flex flex-col justify-between space-y-4" onClick={() => navigate('/hospitals')}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-control bg-[#EBF6F3] text-[#27836A] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#202124]">Hospitals</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Coordinate requests, monitor blood inventory levels, and process donor intake.
              </p>
            </div>
            <span className="text-xs font-bold text-[#27836A] flex items-center gap-1">
              View Network <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Card>

          <Card hoverEffect className="flex flex-col justify-between space-y-4" onClick={() => navigate('/emergency-requests')}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-control bg-[#FDF2F2] text-[#C94B4B] flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#202124]">Emergency</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Prioritize urgent requirements when every minute matters for critical care.
              </p>
            </div>
            <span className="text-xs font-bold text-[#C94B4B] flex items-center gap-1">
              Urgent Requests <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Card>
        </div>
      </section>

      {/* Live Critical Requests Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C94B4B]">Priority Alert</span>
            <h2 className="text-2xl font-bold text-[#202124] mt-0.5">Critical Blood Requests</h2>
          </div>
          <Link to="/emergency-requests">
            <Button variant="outline" size="sm">
              View All Emergency Requests
            </Button>
          </Link>
        </div>

        {emergencyRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyRequests.map((req) => (
              <RequestCard key={req.id} request={req} onSelect={() => navigate('/login')} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-card border border-[#E5E1DC] text-center text-xs text-[#667085]">
            No critical requests currently pending. All current requirements are stable.
          </div>
        )}
      </section>

      {/* How BloodLink Works Section */}
      <section className="bg-white border border-[#E5E1DC] rounded-section p-8 md:p-12 shadow-subtle space-y-8">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">Intelligent Workflow</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#202124]">How BloodLink Works</h2>
          <p className="text-sm text-[#667085]">
            From patient request to completed donation, every step is coordinated seamlessly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Timeline />
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-gradient-to-r from-[#7F1D3A] to-[#4A2545] rounded-section p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Ready to make a difference?</h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Register as a donor or request blood for your medical center in just a few clicks.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/signup">
            <Button variant="outline" size="lg" className="bg-white text-[#7F1D3A] border-white hover:bg-gray-100">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
