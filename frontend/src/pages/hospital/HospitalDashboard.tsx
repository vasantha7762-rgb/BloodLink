import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { MobileNavbar } from '../../components/layout/MobileNavbar';
import { StatCard } from '../../components/ui/StatCard';
import { Table, Column } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BloodInventory, BloodRequest } from '../../types';
import { api } from '../../services/api';
import { Building2, ShieldCheck, Heart, Package, Activity, Plus } from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [inventory, setInventory] = useState<BloodInventory[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('O+');
  const [unitsInput, setUnitsInput] = useState(10);

  const loadHospitalData = async () => {
    setLoading(true);
    try {
      const invRes = await api.get('/inventory');
      setInventory(invRes.data);

      const reqRes = await api.get('/requests');
      setRequests(reqRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitalData();
  }, []);

  const handleUpdateStock = async () => {
    try {
      const existing = inventory.find(i => i.bloodGroup === selectedGroup);
      if (existing) {
        await api.put(`/inventory/${existing.id}`, { availableUnits: unitsInput });
      } else {
        await api.post('/inventory', {
          hospitalId: 'hosp_01',
          hospitalName: 'City Central Health Hospital',
          bloodGroup: selectedGroup,
          availableUnits: unitsInput,
        });
      }
      showToast(`Stock updated for ${selectedGroup}`, 'success');
      setIsModalOpen(false);
      loadHospitalData();
    } catch (err) {
      showToast('Error updating stock', 'error');
    }
  };

  const inventoryColumns: Column<BloodInventory>[] = [
    { header: 'Blood Group', render: (i) => <strong className="text-[#7F1D3A] font-bold text-base">{i.bloodGroup}</strong> },
    { header: 'Available Units', accessor: 'availableUnits' },
    { header: 'Minimum Safety Level', accessor: 'minimumLevel' },
    { header: 'Inventory Status', render: (i) => <StatusBadge status={i.status} /> },
    {
      header: 'Action',
      render: (i) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedGroup(i.bloodGroup);
            setUnitsInput(i.availableUnits);
            setIsModalOpen(true);
          }}
        >
          Update Stock
        </Button>
      ),
    },
  ];

  return (
    <div className="flex bg-[#FAF9F6] min-h-[calc(100vh-5rem)]">
      <Sidebar role="hospital" />
      <main className="flex-1 p-4 md:p-8 space-y-8 pb-20 md:pb-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E5E1DC] p-6 rounded-card shadow-subtle">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-card bg-[#FAF9F6] border border-[#E5E1DC] text-[#7F1D3A] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-extrabold text-[#202124]">
                  {user?.name || 'City Central Health Hospital'}
                </h1>
                <StatusBadge status="verified" size="sm" />
              </div>
              <p className="text-xs text-[#667085] mt-0.5">
                Certified Transfusion Center & Regional Blood Bank Desk
              </p>
            </div>
          </div>

          <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
            Manage Inventory
          </Button>
        </div>

        {/* Operational Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Requests"
            value={requests.length}
            icon={<Heart className="w-5 h-5 text-[#7F1D3A]" />}
            subtitle="Received from network"
          />
          <StatCard
            title="Pending Requests"
            value={requests.filter(r => r.status === 'Searching').length}
            icon={<Activity className="w-5 h-5 text-[#C58A2B]" />}
            subtitle="Requires donor matching"
          />
          <StatCard
            title="Completed Requests"
            value={requests.filter(r => r.status === 'Completed').length}
            icon={<ShieldCheck className="w-5 h-5 text-[#27836A]" />}
            subtitle="Fulfilled transfusions"
          />
          <StatCard
            title="Urgent Requests"
            value={requests.filter(r => r.urgency === 'CRITICAL').length}
            icon={<Package className="w-5 h-5 text-[#C94B4B]" />}
            subtitle="Critical emergency priority"
          />
        </div>

        {/* Blood Inventory Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#202124]">Blood Stock Inventory</h3>
              <p className="text-xs text-[#667085]">Real-time available units per blood group.</p>
            </div>
          </div>

          <Table
            columns={inventoryColumns}
            data={inventory}
            keyExtractor={(item) => item.id}
            isLoading={loading}
          />
        </div>

        {/* Update Inventory Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Update Blood Unit Stock"
          subtitle={`Hospital: ${user?.name || 'City Central Health Hospital'}`}
        >
          <div className="space-y-4">
            <Input
              label="Selected Blood Group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            />
            <Input
              label="Available Units Count"
              type="number"
              min={0}
              max={100}
              value={unitsInput}
              onChange={(e) => setUnitsInput(parseInt(e.target.value, 10) || 0)}
            />
            <Button variant="primary" className="w-full" onClick={handleUpdateStock}>
              Save Stock Levels
            </Button>
          </div>
        </Modal>

      </main>
      <MobileNavbar role="hospital" />
    </div>
  );
};
