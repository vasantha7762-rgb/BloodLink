import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Table, Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { BloodRequest } from '../../types';
import { api } from '../../services/api';
import { PlusCircle, Activity, CheckCircle2, Search, ArrowRight } from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/requests?patientId=${user?.id}`);
      setRequests(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const columns: Column<BloodRequest>[] = [
    { header: 'Request ID', accessor: 'id' },
    { header: 'Blood Group', render: (r) => <strong className="text-[#7F1D3A]">{r.bloodGroup}</strong> },
    { header: 'Units', accessor: 'unitsRequired' },
    { header: 'Hospital', accessor: 'hospitalName' },
    { header: 'Urgency', render: (r) => <StatusBadge status={r.urgency} size="sm" /> },
    { header: 'Status', render: (r) => <StatusBadge status={r.status} size="sm" /> },
    {
      header: 'Action',
      render: (r) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/patient/track-request')}
        >
          Track Progress
        </Button>
      ),
    },
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="patient" />
      <main className="flex-1 p-4 md:p-8 space-y-8 pb-20 md:pb-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E5E1DC] p-6 rounded-card shadow-subtle">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">Patient Assistance Portal</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#202124]">
              Find the support you need.
            </h1>
            <p className="text-xs text-[#667085] mt-0.5">
              Create and monitor emergency blood requests across verified medical institutions.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/patient/request-blood')}
            icon={<PlusCircle className="w-5 h-5" />}
          >
            Request Blood
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="Active Requests"
            value={requests.filter(r => r.status !== 'Completed').length}
            icon={<Activity className="w-5 h-5 text-[#C58A2B]" />}
            subtitle="Currently in matching pipeline"
          />
          <StatCard
            title="Donors Matched"
            value={requests.reduce((acc, curr) => acc + (curr.matchedDonorIds?.length || 0), 0)}
            icon={<Search className="w-5 h-5 text-[#7F1D3A]" />}
            subtitle="Compatible donors notified"
          />
          <StatCard
            title="Requests Completed"
            value={requests.filter(r => r.status === 'Completed').length}
            icon={<CheckCircle2 className="w-5 h-5 text-[#27836A]" />}
            subtitle="Successfully fulfilled"
          />
        </div>

        {/* My Requests Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#202124]">My Blood Requests</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/patient/history')}>
              View All History <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <Table
            columns={columns}
            data={requests}
            keyExtractor={(item) => item.id}
            isLoading={loading}
            emptyMessage="You have not created any blood requests yet."
          />
        </div>

      </main>
      <MobileNavbar role="patient" />
    </div>
  );
};
