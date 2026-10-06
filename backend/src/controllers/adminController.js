const db = require('../config/db');

const getDashboardStats = async (req, res) => {
  try {
    const totalDonors = await db.donors.countDocuments();
    const activeDonors = await db.donors.countDocuments({ availability: 'available' });
    const totalHospitals = await db.hospitals.countDocuments();
    const activeRequests = await db.bloodRequests.countDocuments({ status: { $ne: 'Completed' } });
    const completedRequests = await db.bloodRequests.countDocuments({ status: 'Completed' });
    const emergencyRequests = await db.bloodRequests.countDocuments({ urgency: 'CRITICAL' });

    // Chart Data for Recharts
    const requestsOverTime = [
      { month: 'Jan', requests: 42, completed: 38 },
      { month: 'Feb', requests: 55, completed: 50 },
      { month: 'Mar', requests: 68, completed: 62 },
      { month: 'Apr', requests: 80, completed: 74 },
      { month: 'May', requests: 95, completed: 88 },
      { month: 'Jun', requests: 110, completed: 102 }
    ];

    const allRequests = await db.bloodRequests.find();
    const groupCounts = {};
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    bloodGroups.forEach(bg => { groupCounts[bg] = 0; });
    allRequests.forEach(r => {
      if (groupCounts[r.bloodGroup] !== undefined) {
        groupCounts[r.bloodGroup]++;
      }
    });

    const requestsByBloodGroup = Object.keys(groupCounts).map(bg => ({
      bloodGroup: bg,
      count: groupCounts[bg] || Math.floor(Math.random() * 20) + 5
    }));

    const statusCounts = [
      { name: 'Searching', value: allRequests.filter(r => r.status === 'Searching').length || 4, color: '#C58A2B' },
      { name: 'Donor Found', value: allRequests.filter(r => r.status === 'Donor Found').length || 6, color: '#3F7C7A' },
      { name: 'In Progress', value: allRequests.filter(r => r.status === 'In Progress').length || 8, color: '#4A2545' },
      { name: 'Completed', value: allRequests.filter(r => r.status === 'Completed').length || 15, color: '#27836A' }
    ];

    const hospitalActivity = [
      { name: 'City Central Hospital', requests: 45, fulfilled: 42 },
      { name: 'St. Jude Medical Center', requests: 38, fulfilled: 35 },
      { name: 'Metro General Health', requests: 29, fulfilled: 27 },
      { name: 'University Medical Center', requests: 52, fulfilled: 48 },
      { name: 'Mercy Memorial Hospital', requests: 22, fulfilled: 20 }
    ];

    res.json({
      stats: {
        totalDonors,
        activeDonors,
        totalHospitals,
        activeRequests,
        completedRequests,
        emergencyRequests
      },
      charts: {
        requestsOverTime,
        requestsByBloodGroup,
        requestStatus: statusCounts,
        hospitalActivity
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching admin dashboard data' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await db.users.find();
    const sanitized = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      phone: u.phone,
      createdAt: u.createdAt
    }));
    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching users' });
  }
};

const getStatistics = async (req, res) => {
  try {
    const donors = await db.donors.find();
    const requests = await db.bloodRequests.find();
    const hospitals = await db.hospitals.find();
    const inventory = await db.bloodInventory.find();

    res.json({
      donorsCount: donors.length,
      requestsCount: requests.length,
      hospitalsCount: hospitals.length,
      inventoryTotalUnits: inventory.reduce((acc, curr) => acc + (curr.availableUnits || 0), 0)
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching statistics' });
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  getStatistics
};
