import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { DonorCard } from '../../components/cards/DonorCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import { Donor } from '../../types';
import { api } from '../../services/api';
import { Search, MapPin, SlidersHorizontal, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FindBlood: React.FC = () => {
  const navigate = useNavigate();
  const [bloodGroup, setBloodGroup] = useState('All');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('available');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (bloodGroup !== 'All') params.append('bloodGroup', bloodGroup);
      if (location) params.append('location', location);
      if (availability !== 'All') params.append('availability', availability);

      const res = await api.get(`/donors/search?${params.toString()}`);
      setDonors(res.data);
    } catch (err) {
      console.error('Error fetching donors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDonors();
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D3A]">Donor Discovery</span>
        <h1 className="text-3xl font-extrabold text-[#202124]">Find the Right Match</h1>
        <p className="text-sm text-[#667085] max-w-xl">
          Search for available donors based on blood group, location, and real-time availability.
        </p>
      </div>

      {/* Refined Search Container */}
      <form
        onSubmit={handleSearch}
        className="bg-white border border-[#E5E1DC] rounded-card p-6 shadow-subtle grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <Select
          label="Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          options={[
            { label: 'All Blood Groups', value: 'All' },
            { label: 'A+', value: 'A+' },
            { label: 'A-', value: 'A-' },
            { label: 'B+', value: 'B+' },
            { label: 'B-', value: 'B-' },
            { label: 'AB+', value: 'AB+' },
            { label: 'AB-', value: 'AB-' },
            { label: 'O+', value: 'O+' },
            { label: 'O-', value: 'O-' },
          ]}
        />

        <Input
          label="Location / City"
          placeholder="e.g. New York, Boston, Chicago"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          icon={<MapPin className="w-4 h-4 text-[#7F1D3A]" />}
        />

        <Select
          label="Availability Status"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          options={[
            { label: 'All Statuses', value: 'All' },
            { label: 'Available Only', value: 'available' },
            { label: 'Unavailable', value: 'unavailable' },
          ]}
        />

        <Button variant="primary" type="submit" isLoading={loading} icon={<Search className="w-4 h-4" />}>
          Find Donors
        </Button>
      </form>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#202124] flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#27836A]" />
          Available Donors ({donors.length})
        </h3>
        <span className="text-xs text-[#667085]">Showing verified donor records</span>
      </div>

      {/* Results List */}
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : donors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <DonorCard
              key={donor.id}
              donor={donor}
              onSelect={() => navigate('/login')}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Matching Donors Found"
          description="We couldn't find any donors matching your criteria. Try adjusting the blood group or city filters."
        />
      )}
    </div>
  );
};
