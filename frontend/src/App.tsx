import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Pages
import { Home } from './pages/public/Home';
import { FindBlood } from './pages/public/FindBlood';
import { BecomeDonor } from './pages/public/BecomeDonor';
import { Hospitals } from './pages/public/Hospitals';
import { EmergencyRequests } from './pages/public/EmergencyRequests';
import { About } from './pages/public/About';
import { Login } from './pages/public/Login';
import { Signup } from './pages/public/Signup';

// Donor Pages
import { DonorDashboard } from './pages/donor/DonorDashboard';
import { DonorRequests } from './pages/donor/DonorRequests';
import { DonorDonations } from './pages/donor/DonorDonations';
import { DonorAvailability } from './pages/donor/DonorAvailability';
import { DonorNotifications } from './pages/donor/DonorNotifications';
import { DonorProfile } from './pages/donor/DonorProfile';

// Patient Pages
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { RequestBloodFlow } from './pages/patient/RequestBloodFlow';
import { TrackRequest } from './pages/patient/TrackRequest';
import { PatientHistory } from './pages/patient/PatientHistory';
import { PatientNotifications } from './pages/patient/PatientNotifications';
import { PatientProfile } from './pages/patient/PatientProfile';

// Hospital Pages
import { HospitalDashboard } from './pages/hospital/HospitalDashboard';
import { HospitalRequests } from './pages/hospital/HospitalRequests';
import { HospitalInventoryPage } from './pages/hospital/HospitalInventory';
import { HospitalDonors } from './pages/hospital/HospitalDonors';
import { HospitalReports } from './pages/hospital/HospitalReports';
import { HospitalProfile } from './pages/hospital/HospitalProfile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminDonors } from './pages/admin/AdminDonors';
import { AdminPatients } from './pages/admin/AdminPatients';
import { AdminHospitals } from './pages/admin/AdminHospitals';
import { AdminRequests } from './pages/admin/AdminRequests';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: string }> = ({
  children,
  allowedRole,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-sm font-semibold text-[#667085]">Authenticating session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/find-blood" element={<FindBlood />} />
          <Route path="/become-donor" element={<BecomeDonor />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/emergency-requests" element={<EmergencyRequests />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Donor Routes */}
          <Route path="/donor/dashboard" element={<ProtectedRoute allowedRole="donor"><DonorDashboard /></ProtectedRoute>} />
          <Route path="/donor/requests" element={<ProtectedRoute allowedRole="donor"><DonorRequests /></ProtectedRoute>} />
          <Route path="/donor/donations" element={<ProtectedRoute allowedRole="donor"><DonorDonations /></ProtectedRoute>} />
          <Route path="/donor/availability" element={<ProtectedRoute allowedRole="donor"><DonorAvailability /></ProtectedRoute>} />
          <Route path="/donor/notifications" element={<ProtectedRoute allowedRole="donor"><DonorNotifications /></ProtectedRoute>} />
          <Route path="/donor/profile" element={<ProtectedRoute allowedRole="donor"><DonorProfile /></ProtectedRoute>} />

          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={<ProtectedRoute allowedRole="patient"><PatientDashboard /></ProtectedRoute>} />
          <Route path="/patient/request-blood" element={<ProtectedRoute allowedRole="patient"><RequestBloodFlow /></ProtectedRoute>} />
          <Route path="/patient/track-request" element={<ProtectedRoute allowedRole="patient"><TrackRequest /></ProtectedRoute>} />
          <Route path="/patient/history" element={<ProtectedRoute allowedRole="patient"><PatientHistory /></ProtectedRoute>} />
          <Route path="/patient/notifications" element={<ProtectedRoute allowedRole="patient"><PatientNotifications /></ProtectedRoute>} />
          <Route path="/patient/profile" element={<ProtectedRoute allowedRole="patient"><PatientProfile /></ProtectedRoute>} />

          {/* Hospital Routes */}
          <Route path="/hospital/dashboard" element={<ProtectedRoute allowedRole="hospital"><HospitalDashboard /></ProtectedRoute>} />
          <Route path="/hospital/requests" element={<ProtectedRoute allowedRole="hospital"><HospitalRequests /></ProtectedRoute>} />
          <Route path="/hospital/inventory" element={<ProtectedRoute allowedRole="hospital"><HospitalInventoryPage /></ProtectedRoute>} />
          <Route path="/hospital/donors" element={<ProtectedRoute allowedRole="hospital"><HospitalDonors /></ProtectedRoute>} />
          <Route path="/hospital/reports" element={<ProtectedRoute allowedRole="hospital"><HospitalReports /></ProtectedRoute>} />
          <Route path="/hospital/profile" element={<ProtectedRoute allowedRole="hospital"><HospitalProfile /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/donors" element={<ProtectedRoute allowedRole="admin"><AdminDonors /></ProtectedRoute>} />
          <Route path="/admin/patients" element={<ProtectedRoute allowedRole="admin"><AdminPatients /></ProtectedRoute>} />
          <Route path="/admin/hospitals" element={<ProtectedRoute allowedRole="admin"><AdminHospitals /></ProtectedRoute>} />
          <Route path="/admin/requests" element={<ProtectedRoute allowedRole="admin"><AdminRequests /></ProtectedRoute>} />
          <Route path="/admin/inventory" element={<ProtectedRoute allowedRole="admin"><AdminInventory /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute allowedRole="admin"><AdminReports /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRole="admin"><AdminSettings /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
