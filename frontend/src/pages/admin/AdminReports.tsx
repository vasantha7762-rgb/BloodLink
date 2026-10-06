import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Download } from 'lucide-react';

export const AdminReports: React.FC = () => {
  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        <h1 className="text-2xl font-extrabold text-[#202124]">System Analytics & Audit Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-4">
            <h3 className="font-bold text-base text-[#202124]">Platform Performance Report</h3>
            <p className="text-xs text-[#667085]">Comprehensive quarterly stats on smart matching accuracy, response latencies, and regional fulfillment.</p>
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>Export Analytics CSV</Button>
          </Card>
          <Card className="space-y-4">
            <h3 className="font-bold text-base text-[#202124]">Hospital Compliance Audit</h3>
            <p className="text-xs text-[#667085]">Verification logs, inventory stock accuracy reports, and partner hospital response metrics.</p>
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>Export Audit PDF</Button>
          </Card>
        </div>
      </main>
      <MobileNavbar role="admin" />
    </div>
  );
};
