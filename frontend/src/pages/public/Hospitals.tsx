import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { HospitalCard } from '../../components/cards/HospitalCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import { Hospital } from '../../types';
import { api } from '../../services/api';
import { Building2, Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hospitals: React.FC = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const url = city ? `/hospitals?city=${city}` : '/hospitals';
      const res = await api.get(url);
      setHospitals(res.data);
    } catch (err) {
      console.error('Error fetching hospitals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [city]);

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">Hospital Network</span>
        <h1 className="text-3xl font-extrabold text-[#202124]">Healthcare Network</h1>
        <p className="text-sm text-[#667085] max-w-xl">
          Connect with verified hospitals, medical centers, and regional blood banks.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-[#E5E1DC] rounded-card p-4 shadow-subtle flex items-center gap-4 max-w-md">
        <Input
          placeholder="Filter by city (e.g. New York, Boston)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          icon={<MapPin className="w-4 h-4 text-[#7F1D3A]" />}
          className="border-none hover:border-none focus:ring-0"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : hospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hospitals.map((hosp) => (
            <HospitalCard
              key={hosp.id}
              hospital={hosp}
              onSelect={() => navigate('/login')}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Hospitals Found"
          description="We couldn't find any registered hospitals matching that location filter."
        />
      )}
    </div>
  );
};
