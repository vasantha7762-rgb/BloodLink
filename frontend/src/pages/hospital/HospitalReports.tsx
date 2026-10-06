import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Card } from '../../components/ui/Card';
import { FileBarChart, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const HospitalReports: React.FC = () => {
  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="hospital" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">Operational Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-4">
            <h3 className="font-bold text-base text-[#202124]">Monthly Transfusion Summary</h3>
            <p className="text-xs text-[#667085]">Detailed breakdown of blood units dispensed per medical department.</p>
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
              Download CSV Report
            </Button>
          </Card>
          <Card className="space-y-4">
            <h3 className="font-bold text-base text-[#202124]">Donor Turnout Analysis</h3>
            <p className="text-xs text-[#667085]">Statistical analysis of emergency request response times and donor attendance.</p>
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
              Download Analytics PDF
            </Button>
          </Card>
        </div>
      </main>
      <MobileNavbar role="hospital" />
    </div>
  );
};
