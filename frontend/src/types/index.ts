export type UserRole = 'donor' | 'patient' | 'hospital' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt?: string;
  profile?: Donor | Patient | Hospital;
}

export interface Donor {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  location: string;
  city: string;
  availability: 'available' | 'unavailable';
  lastDonationDate: string;
  totalDonations: number;
  verificationStatus: 'verified' | 'pending';
  distanceKm?: string | number;
}

export interface Patient {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  location?: string;
}

export interface Hospital {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  verificationStatus: 'verified' | 'pending';
  contactPerson?: string;
  inventory?: BloodInventory[];
  requests?: BloodRequest[];
}

export type RequestUrgency = 'CRITICAL' | 'URGENT' | 'HIGH' | 'NORMAL';
export type RequestStatus = 'Searching' | 'Donor Found' | 'In Progress' | 'Completed' | 'Cancelled';

export interface BloodRequest {
  id: string;
  patientId: string;
  requesterName: string;
  requesterPhone: string;
  bloodGroup: string;
  unitsRequired: number;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  location?: string;
  urgency: RequestUrgency;
  status: RequestStatus;
  matchedDonorIds?: string[];
  acceptedDonorId?: string | null;
  additionalNotes?: string;
  timePosted?: string;
  createdAt?: string;
  matchedDonorDetails?: Donor[];
  acceptedDonorDetail?: Donor;
}

export interface Donation {
  id: string;
  requestId: string;
  donorId: string;
  hospitalName: string;
  bloodGroup: string;
  units: number;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  donationDate: string;
}

export interface BloodInventory {
  id: string;
  hospitalId: string;
  hospitalName: string;
  bloodGroup: string;
  availableUnits: number;
  minimumLevel: number;
  status: 'Healthy' | 'Low' | 'Critical';
  lastUpdated?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'Emergency Request' | 'Request Accepted' | 'Donation Reminder' | 'Request Completed' | 'System Update';
  title: string;
  description: string;
  isRead: boolean;
  link?: string;
  createdAt?: string;
}
