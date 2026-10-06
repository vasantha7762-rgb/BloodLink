import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { ShieldAlert, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E5E1DC] text-[#202124] pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" showTagline />
            <p className="text-xs text-[#667085] leading-relaxed">
              BloodLink connects donors, patients, hospitals, and blood banks through one intelligent platform.
            </p>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#202124]">Platform</h5>
            <ul className="space-y-2 text-xs text-[#667085]">
              <li><Link to="/find-blood" className="hover:text-[#7F1D3A] transition-colors">Find Donors</Link></li>
              <li><Link to="/become-donor" className="hover:text-[#7F1D3A] transition-colors">Become a Donor</Link></li>
              <li><Link to="/hospitals" className="hover:text-[#7F1D3A] transition-colors">Hospital Network</Link></li>
              <li><Link to="/emergency-requests" className="hover:text-[#7F1D3A] transition-colors">Emergency Requests</Link></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#202124]">Account Portals</h5>
            <ul className="space-y-2 text-xs text-[#667085]">
              <li><Link to="/login" className="hover:text-[#7F1D3A] transition-colors">Donor Login</Link></li>
              <li><Link to="/login" className="hover:text-[#7F1D3A] transition-colors">Patient Portal</Link></li>
              <li><Link to="/login" className="hover:text-[#7F1D3A] transition-colors">Hospital Login</Link></li>
              <li><Link to="/login" className="hover:text-[#7F1D3A] transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#202124]">Contact & Emergency</h5>
            <div className="space-y-2 text-xs text-[#667085]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#7F1D3A]" />
                <span>+1 (800) 555-BLOOD</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#7F1D3A]" />
                <span>support@bloodlink.org</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#7F1D3A]" />
                <span>Healthcare Tech Center, Sector 4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="bg-[#FAF9F6] border border-[#E5E1DC] rounded-card p-4 flex items-start gap-3 text-xs text-[#667085] leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-[#C58A2B] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#202124] block font-semibold mb-0.5">Medical & Operational Disclaimer:</strong>
            BloodLink is an intelligent coordination platform. Final donor eligibility, cross-matching, and blood transfusion compatibility must always be confirmed by qualified medical professionals and the receiving hospital or certified blood bank.
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#E5E1DC]/60 flex flex-col md:flex-row items-center justify-between text-xs text-[#667085] gap-4">
          <div>
            © {new Date().getFullYear()} BloodLink Health Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#202124] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#202124] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#202124] cursor-pointer">Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
