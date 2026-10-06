import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { api } from '../../services/api';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { Users, Heart, Building2, Activity, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  // Custom BloodLink Palette for Charts
  const BLOODLINK_PALETTE = ['#7F1D3A', '#4A2545', '#27836A', '#C58A2B', '#3F7C7A', '#C94B4B', '#C98F9B'];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="admin" />

      <main className="flex-1 p-4 md:p-8 space-y-8 pb-20 md:pb-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E5E1DC] p-6 rounded-card shadow-subtle">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">System Administration</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#202124]">
              BloodLink Network Analytics
            </h1>
            <p className="text-xs text-[#667085] mt-0.5">
              Comprehensive platform metrics, smart donor matching performance, and inventory health.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#EBF6F3] border border-[#27836A]/30 px-3.5 py-2 rounded-control text-xs font-bold text-[#27836A]">
            <ShieldCheck className="w-4 h-4" /> System Operational
          </div>
        </div>

        {/* 6 Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="Total Donors"
            value={data?.stats?.totalDonors || 12}
            icon={<Heart className="w-4 h-4 text-[#7F1D3A]" />}
          />
          <StatCard
            title="Active Donors"
            value={data?.stats?.activeDonors || 9}
            icon={<Users className="w-4 h-4 text-[#27836A]" />}
          />
          <StatCard
            title="Hospitals"
            value={data?.stats?.totalHospitals || 5}
            icon={<Building2 className="w-4 h-4 text-[#4A2545]" />}
          />
          <StatCard
            title="Active Requests"
            value={data?.stats?.activeRequests || 11}
            icon={<Activity className="w-4 h-4 text-[#C58A2B]" />}
          />
          <StatCard
            title="Completed"
            value={data?.stats?.completedRequests || 5}
            icon={<CheckCircle2 className="w-4 h-4 text-[#27836A]" />}
          />
          <StatCard
            title="Emergency"
            value={data?.stats?.emergencyRequests || 4}
            icon={<AlertCircle className="w-4 h-4 text-[#C94B4B]" />}
          />
        </div>

        {/* Recharts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Requests Over Time (Area Chart) */}
          <Card className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#202124]">Requests & Fulfillment Trend</h3>
                <p className="text-xs text-[#667085]">Monthly request volume vs completed transfusions.</p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.charts?.requestsOverTime || []}>
                  <defs>
                    <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7F1D3A" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7F1D3A" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#27836A" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#27836A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E1DC" />
                  <XAxis dataKey="month" stroke="#667085" fontSize={11} />
                  <YAxis stroke="#667085" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E1DC', borderRadius: '8px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="requests" stroke="#7F1D3A" fillOpacity={1} fill="url(#colorReq)" name="Total Requests" />
                  <Area type="monotone" dataKey="completed" stroke="#27836A" fillOpacity={1} fill="url(#colorComp)" name="Completed Transfusions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Request Status Breakdown (Pie / Donut Chart) */}
          <Card className="lg:col-span-5 space-y-4">
            <div>
              <h3 className="font-bold text-base text-[#202124]">Request Status Distribution</h3>
              <p className="text-xs text-[#667085]">Current status of active blood requests.</p>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.charts?.requestStatus || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {(data?.charts?.requestStatus || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={BLOODLINK_PALETTE[index % BLOODLINK_PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E1DC', borderRadius: '8px', fontSize: '12px' }} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

        </div>

        {/* Recharts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Requests by Blood Group (Bar Chart) */}
          <Card className="lg:col-span-6 space-y-4">
            <div>
              <h3 className="font-bold text-base text-[#202124]">Requests by Blood Group</h3>
              <p className="text-xs text-[#667085]">Volume distribution across ABO/Rh groups.</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.charts?.requestsByBloodGroup || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E1DC" />
                  <XAxis dataKey="bloodGroup" stroke="#667085" fontSize={11} />
                  <YAxis stroke="#667085" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E1DC', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="count" fill="#7F1D3A" radius={[6, 6, 0, 0]} name="Request Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Hospital Activity (Bar Chart) */}
          <Card className="lg:col-span-6 space-y-4">
            <div>
              <h3 className="font-bold text-base text-[#202124]">Partner Hospital Activity</h3>
              <p className="text-xs text-[#667085]">Fulfillment comparison across major healthcare providers.</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.charts?.hospitalActivity || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E1DC" />
                  <XAxis dataKey="name" stroke="#667085" fontSize={10} tick={{ fontSize: 9 }} />
                  <YAxis stroke="#667085" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E1DC', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="requests" fill="#4A2545" name="Requested" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fulfilled" fill="#27836A" name="Fulfilled" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

        </div>

      </main>
      <MobileNavbar role="admin" />
    </div>
  );
};
