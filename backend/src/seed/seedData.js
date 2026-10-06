const bcrypt = require('bcryptjs');
const db = require('../config/db');

const seedDatabase = async () => {
  console.log('Seeding BloodLink database with realistic healthtech data...');

  // Clear existing collections
  await db.users.deleteMany();
  await db.donors.deleteMany();
  await db.patients.deleteMany();
  await db.hospitals.deleteMany();
  await db.bloodRequests.deleteMany();
  await db.donations.deleteMany();
  await db.bloodInventory.deleteMany();
  await db.notifications.deleteMany();

  const defaultPassword = await bcrypt.hash('password123', 10);

  // 1. Create Admin User
  const adminUser = await db.users.create({
    id: 'user_admin_01',
    name: 'Dr. Eleanor Vance',
    email: 'admin@bloodlink.org',
    password: defaultPassword,
    role: 'admin',
    phone: '+1 (555) 019-2831'
  });

  // 2. Create Hospitals
  const hospitalSeeds = [
    {
      id: 'hosp_01',
      userId: 'user_hosp_01',
      name: 'City Central Health Hospital',
      email: 'contact@citycentralhealth.org',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Sector 4',
      city: 'New York',
      verificationStatus: 'verified',
      contactPerson: 'Dr. Sarah Jenkins'
    },
    {
      id: 'hosp_02',
      userId: 'user_hosp_02',
      name: 'St. Jude Children Medical Center',
      email: 'emergency@stjude-med.org',
      phone: '+1 (555) 345-6789',
      address: '1088 Ocean Drive, Downtown',
      city: 'Boston',
      verificationStatus: 'verified',
      contactPerson: 'Dr. Michael Chang'
    },
    {
      id: 'hosp_03',
      userId: 'user_hosp_03',
      name: 'Metro General Healthcare System',
      email: 'bloodbank@metrogeneral.org',
      phone: '+1 (555) 456-7890',
      address: '450 University Boulevard',
      city: 'Chicago',
      verificationStatus: 'verified',
      contactPerson: 'Dr. Rachel Adams'
    },
    {
      id: 'hosp_04',
      userId: 'user_hosp_04',
      name: 'University Academic Medical Center',
      email: 'coordination@uamc-health.org',
      phone: '+1 (555) 567-8901',
      address: '1200 Science & Health Parkway',
      city: 'San Francisco',
      verificationStatus: 'verified',
      contactPerson: 'Dr. Marcus Vance'
    },
    {
      id: 'hosp_05',
      userId: 'user_hosp_05',
      name: 'Mercy Memorial Community Hospital',
      email: 'transfusion@mercymemorial.org',
      phone: '+1 (555) 678-9012',
      address: '89 Mission Street, West End',
      city: 'Seattle',
      verificationStatus: 'verified',
      contactPerson: 'Dr. Elena Rostova'
    }
  ];

  for (const h of hospitalSeeds) {
    await db.users.create({
      id: h.userId,
      name: h.contactPerson,
      email: h.email,
      password: defaultPassword,
      role: 'hospital',
      phone: h.phone
    });
    await db.hospitals.create(h);

    // Create Blood Inventory for hospital
    const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    for (const bg of groups) {
      let units = Math.floor(Math.random() * 14) + 2;
      let minLvl = 5;
      let status = 'Healthy';
      if (units <= 2) status = 'Critical';
      else if (units <= minLvl) status = 'Low';

      await db.bloodInventory.create({
        hospitalId: h.id,
        hospitalName: h.name,
        bloodGroup: bg,
        availableUnits: units,
        minimumLevel: minLvl,
        status,
        lastUpdated: new Date().toISOString()
      });
    }
  }

  // 3. Create Donors (12 donors)
  const donorSeeds = [
    { name: 'Ravi Kumar', email: 'donor@bloodlink.org', bloodGroup: 'O-', city: 'New York', phone: '+1 (555) 101-2020', lastDonation: '2026-06-15', totalDonations: 8 },
    { name: 'Sophia Chen', email: 'sophia.c@example.com', bloodGroup: 'A+', city: 'New York', phone: '+1 (555) 102-3030', lastDonation: '2026-07-02', totalDonations: 4 },
    { name: 'David Miller', email: 'david.m@example.com', bloodGroup: 'B+', city: 'Boston', phone: '+1 (555) 103-4040', lastDonation: '2026-05-20', totalDonations: 12 },
    { name: 'Amina Al-Mansoor', email: 'amina.a@example.com', bloodGroup: 'O+', city: 'Chicago', phone: '+1 (555) 104-5050', lastDonation: '2026-08-10', totalDonations: 5 },
    { name: 'Carlos Rodriguez', email: 'carlos.r@example.com', bloodGroup: 'AB+', city: 'San Francisco', phone: '+1 (555) 105-6060', lastDonation: '2026-04-12', totalDonations: 9 },
    { name: 'Emily Watson', email: 'emily.w@example.com', bloodGroup: 'A-', city: 'Seattle', phone: '+1 (555) 106-7070', lastDonation: '2026-07-28', totalDonations: 3 },
    { name: 'James Wilson', email: 'james.w@example.com', bloodGroup: 'B-', city: 'New York', phone: '+1 (555) 107-8080', lastDonation: '2026-03-30', totalDonations: 15 },
    { name: 'Priya Sharma', email: 'priya.s@example.com', bloodGroup: 'O-', city: 'Boston', phone: '+1 (555) 108-9090', lastDonation: '2026-08-01', totalDonations: 7 },
    { name: 'Lucas Rossi', email: 'lucas.r@example.com', bloodGroup: 'AB-', city: 'Chicago', phone: '+1 (555) 109-0011', lastDonation: '2026-02-18', totalDonations: 2 },
    { name: 'Hannah Abbott', email: 'hannah.a@example.com', bloodGroup: 'O+', city: 'San Francisco', phone: '+1 (555) 110-1122', lastDonation: '2026-06-30', totalDonations: 6 },
    { name: 'Kobe Bryant', email: 'kobe.b@example.com', bloodGroup: 'A+', city: 'Seattle', phone: '+1 (555) 111-2233', lastDonation: '2026-07-14', totalDonations: 11 },
    { name: 'Maya Lin', email: 'maya.l@example.com', bloodGroup: 'B+', city: 'New York', phone: '+1 (555) 112-3344', lastDonation: '2026-05-05', totalDonations: 5 }
  ];

  for (let i = 0; i < donorSeeds.length; i++) {
    const d = donorSeeds[i];
    const uId = `user_donor_${i + 1}`;
    await db.users.create({
      id: uId,
      name: d.name,
      email: d.email,
      password: defaultPassword,
      role: 'donor',
      phone: d.phone
    });

    await db.donors.create({
      id: `donor_${i + 1}`,
      userId: uId,
      name: d.name,
      email: d.email,
      phone: d.phone,
      bloodGroup: d.bloodGroup,
      location: d.city,
      city: d.city,
      availability: i % 4 === 0 ? 'unavailable' : 'available',
      lastDonationDate: d.lastDonation,
      totalDonations: d.totalDonations,
      verificationStatus: 'verified'
    });
  }

  // 4. Create Patients (6 patients)
  const patientSeeds = [
    { name: 'Alex Rivera', email: 'patient@bloodlink.org', city: 'New York', phone: '+1 (555) 201-3030' },
    { name: 'Grace Hopper', email: 'grace.h@example.com', city: 'Boston', phone: '+1 (555) 202-4040' },
    { name: 'Liam O\'Connor', email: 'liam.o@example.com', city: 'Chicago', phone: '+1 (555) 203-5050' },
    { name: 'Zoe Kravitz', email: 'zoe.k@example.com', city: 'San Francisco', phone: '+1 (555) 204-6060' },
    { name: 'Noah Taylor', email: 'noah.t@example.com', city: 'Seattle', phone: '+1 (555) 205-7070' },
    { name: 'Chloe Bennett', email: 'chloe.b@example.com', city: 'New York', phone: '+1 (555) 206-8080' }
  ];

  for (let i = 0; i < patientSeeds.length; i++) {
    const p = patientSeeds[i];
    const uId = `user_patient_${i + 1}`;
    await db.users.create({
      id: uId,
      name: p.name,
      email: p.email,
      password: defaultPassword,
      role: 'patient',
      phone: p.phone
    });

    await db.patients.create({
      id: `patient_${i + 1}`,
      userId: uId,
      name: p.name,
      email: p.email,
      phone: p.phone,
      city: p.city,
      location: p.city
    });
  }

  // 5. Create Blood Requests (16 requests)
  const requestSeeds = [
    { bloodGroup: 'O-', units: 3, hospital: 'City Central Health Hospital', city: 'New York', urgency: 'CRITICAL', status: 'Searching', time: '12 mins ago', patientId: 'user_patient_1', name: 'Alex Rivera' },
    { bloodGroup: 'A+', units: 2, hospital: 'City Central Health Hospital', city: 'New York', urgency: 'URGENT', status: 'Donor Found', time: '45 mins ago', patientId: 'user_patient_1', name: 'Alex Rivera', acceptedDonorId: 'donor_2' },
    { bloodGroup: 'B+', units: 4, hospital: 'St. Jude Children Medical Center', city: 'Boston', urgency: 'CRITICAL', status: 'In Progress', time: '1 hour ago', patientId: 'user_patient_2', name: 'Grace Hopper', acceptedDonorId: 'donor_3' },
    { bloodGroup: 'AB-', units: 1, hospital: 'Metro General Healthcare System', city: 'Chicago', urgency: 'HIGH', status: 'Searching', time: '2 hours ago', patientId: 'user_patient_3', name: 'Liam O\'Connor' },
    { bloodGroup: 'O+', units: 2, hospital: 'University Academic Medical Center', city: 'San Francisco', urgency: 'NORMAL', status: 'Completed', time: '5 hours ago', patientId: 'user_patient_4', name: 'Zoe Kravitz', acceptedDonorId: 'donor_10' },
    { bloodGroup: 'A-', units: 3, hospital: 'Mercy Memorial Community Hospital', city: 'Seattle', urgency: 'CRITICAL', status: 'Donor Found', time: '3 hours ago', patientId: 'user_patient_5', name: 'Noah Taylor', acceptedDonorId: 'donor_6' },
    { bloodGroup: 'O-', units: 5, hospital: 'Metro General Healthcare System', city: 'Chicago', urgency: 'CRITICAL', status: 'Searching', time: '30 mins ago', patientId: 'user_patient_3', name: 'Liam O\'Connor' },
    { bloodGroup: 'B-', units: 2, hospital: 'City Central Health Hospital', city: 'New York', urgency: 'HIGH', status: 'Searching', time: '4 hours ago', patientId: 'user_patient_6', name: 'Chloe Bennett' },
    { bloodGroup: 'AB+', units: 2, hospital: 'St. Jude Children Medical Center', city: 'Boston', urgency: 'NORMAL', status: 'Completed', time: '1 day ago', patientId: 'user_patient_2', name: 'Grace Hopper', acceptedDonorId: 'donor_5' },
    { bloodGroup: 'A+', units: 3, hospital: 'University Academic Medical Center', city: 'San Francisco', urgency: 'URGENT', status: 'In Progress', time: '6 hours ago', patientId: 'user_patient_4', name: 'Zoe Kravitz', acceptedDonorId: 'donor_5' },
    { bloodGroup: 'O+', units: 4, hospital: 'Mercy Memorial Community Hospital', city: 'Seattle', urgency: 'HIGH', status: 'Searching', time: '8 hours ago', patientId: 'user_patient_5', name: 'Noah Taylor' },
    { bloodGroup: 'B+', units: 2, hospital: 'City Central Health Hospital', city: 'New York', urgency: 'NORMAL', status: 'Completed', time: '2 days ago', patientId: 'user_patient_1', name: 'Alex Rivera', acceptedDonorId: 'donor_12' },
    { bloodGroup: 'A-', units: 1, hospital: 'Metro General Healthcare System', city: 'Chicago', urgency: 'URGENT', status: 'Searching', time: '10 hours ago', patientId: 'user_patient_3', name: 'Liam O\'Connor' },
    { bloodGroup: 'O-', units: 2, hospital: 'St. Jude Children Medical Center', city: 'Boston', urgency: 'CRITICAL', status: 'Donor Found', time: '15 mins ago', patientId: 'user_patient_2', name: 'Grace Hopper', acceptedDonorId: 'donor_8' },
    { bloodGroup: 'AB-', units: 3, hospital: 'University Academic Medical Center', city: 'San Francisco', urgency: 'HIGH', status: 'Searching', time: '5 hours ago', patientId: 'user_patient_4', name: 'Zoe Kravitz' },
    { bloodGroup: 'A+', units: 2, hospital: 'Mercy Memorial Community Hospital', city: 'Seattle', urgency: 'NORMAL', status: 'Completed', time: '3 days ago', patientId: 'user_patient_5', name: 'Noah Taylor', acceptedDonorId: 'donor_11' }
  ];

  for (let i = 0; i < requestSeeds.length; i++) {
    const r = requestSeeds[i];
    await db.bloodRequests.create({
      id: `req_${i + 1}`,
      patientId: r.patientId,
      requesterName: r.name,
      requesterPhone: '+1 (555) 900-1122',
      bloodGroup: r.bloodGroup,
      unitsRequired: r.units,
      hospitalName: r.hospital,
      hospitalAddress: `${r.hospital}, ${r.city}`,
      city: r.city,
      location: r.city,
      urgency: r.urgency,
      status: r.status,
      matchedDonorIds: ['donor_1', 'donor_2', 'donor_8'],
      acceptedDonorId: r.acceptedDonorId || null,
      additionalNotes: 'Urgent surgery scheduled. Please contact hospital blood desk upon arrival.',
      timePosted: r.time,
      createdAt: new Date(Date.now() - i * 3600000 * 4).toISOString()
    });
  }

  // 6. Notifications for demo user
  const notifSeeds = [
    {
      userId: 'user_donor_1', // Ravi Kumar
      type: 'Emergency Request',
      title: 'CRITICAL: O- Blood Needed Immediately',
      description: 'City Central Health Hospital requires 3 units of O- blood for emergency trauma surgery.',
      isRead: false,
      link: '/donor/requests'
    },
    {
      userId: 'user_donor_1',
      type: 'Donation Reminder',
      title: 'You are eligible to donate!',
      description: 'Your last donation was over 56 days ago. Consider scheduling your next donation today.',
      isRead: true,
      link: '/donor/availability'
    },
    {
      userId: 'user_patient_1', // Alex Rivera
      type: 'Request Accepted',
      title: 'Donor Found for A+ Blood Request',
      description: 'Sophia Chen has accepted your request at City Central Health Hospital.',
      isRead: false,
      link: '/patient/track-request'
    },
    {
      userId: 'global',
      type: 'System Update',
      title: 'BloodLink Platform Updated',
      description: 'Enhanced smart donor matching is now active across all connected hospitals.',
      isRead: false,
      link: '/'
    }
  ];

  for (const n of notifSeeds) {
    await db.notifications.create(n);
  }

  console.log('Database seeded successfully!');
  console.log('Test Accounts created:');
  console.log(' - Admin: admin@bloodlink.org / password123');
  console.log(' - Donor: donor@bloodlink.org / password123');
  console.log(' - Patient: patient@bloodlink.org / password123');
  console.log(' - Hospital: contact@citycentralhealth.org / password123');
};

module.exports = { seedDatabase };
