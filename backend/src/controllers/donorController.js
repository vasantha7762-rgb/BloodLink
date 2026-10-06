const db = require('../config/db');

const getDonors = async (req, res) => {
  try {
    const donors = await db.donors.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching donors' });
  }
};

const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, location, availability, distance } = req.query;
    let donors = await db.donors.find();

    if (bloodGroup && bloodGroup !== 'All') {
      donors = donors.filter(d => d.bloodGroup === bloodGroup);
    }
    if (location) {
      const loc = location.toLowerCase();
      donors = donors.filter(d => (d.city && d.city.toLowerCase().includes(loc)) || (d.location && d.location.toLowerCase().includes(loc)));
    }
    if (availability && availability !== 'All') {
      donors = donors.filter(d => d.availability === availability);
    }

    // Map distance field if present or calculate mock distance
    const results = donors.map(d => ({
      ...d,
      distanceKm: d.distanceKm || (Math.random() * 8 + 1).toFixed(1)
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error searching donors' });
  }
};

const getDonorById = async (req, res) => {
  try {
    const donor = await db.donors.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching donor details' });
  }
};

const registerDonorProfile = async (req, res) => {
  try {
    const { name, email, phone, bloodGroup, location, city, availability, lastDonationDate } = req.body;
    
    // Check if user has an existing donor profile
    const existing = await db.donors.findOne({ email: email.toLowerCase() });
    if (existing) {
      const updated = await db.donors.findByIdAndUpdate(existing.id, {
        name, phone, bloodGroup, location: location || city, city: city || location,
        availability: availability || 'available', lastDonationDate
      });
      return res.json(updated);
    }

    const newDonor = await db.donors.create({
      userId: req.user ? req.user.id : null,
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      bloodGroup: bloodGroup || 'O+',
      location: location || city || 'New York',
      city: city || location || 'New York',
      availability: availability || 'available',
      lastDonationDate: lastDonationDate || new Date().toISOString().split('T')[0],
      totalDonations: 0,
      verificationStatus: 'verified'
    });

    res.status(201).json(newDonor);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating donor profile' });
  }
};

const updateDonor = async (req, res) => {
  try {
    const updated = await db.donors.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating donor' });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    let donor = await db.donors.findOne({ userId: req.user.id });
    if (!donor && req.params.id) {
      donor = await db.donors.findById(req.params.id);
    }

    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found' });
    }

    const updated = await db.donors.findByIdAndUpdate(donor.id, { availability });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating availability' });
  }
};

module.exports = {
  getDonors,
  searchDonors,
  getDonorById,
  registerDonorProfile,
  updateDonor,
  updateAvailability
};
