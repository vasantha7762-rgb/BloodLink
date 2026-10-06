const db = require('../config/db');

const getHospitals = async (req, res) => {
  try {
    const { city, verificationStatus } = req.query;
    let hospitals = await db.hospitals.find();

    if (city) {
      hospitals = hospitals.filter(h => h.city?.toLowerCase().includes(city.toLowerCase()) || h.address?.toLowerCase().includes(city.toLowerCase()));
    }
    if (verificationStatus) {
      hospitals = hospitals.filter(h => h.verificationStatus === verificationStatus);
    }

    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching hospitals' });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const hospital = await db.hospitals.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    const inventory = await db.bloodInventory.find({ hospitalId: hospital.id });
    const requests = await db.bloodRequests.find({ hospitalName: hospital.name });

    res.json({
      ...hospital,
      inventory,
      requests
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching hospital details' });
  }
};

const createHospital = async (req, res) => {
  try {
    const { name, email, phone, address, city, contactPerson } = req.body;
    const newHospital = await db.hospitals.create({
      userId: req.user ? req.user.id : null,
      name,
      email,
      phone,
      address,
      city: city || address,
      verificationStatus: 'verified',
      contactPerson
    });

    const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    for (const bg of groups) {
      await db.bloodInventory.create({
        hospitalId: newHospital.id,
        hospitalName: newHospital.name,
        bloodGroup: bg,
        availableUnits: 10,
        minimumLevel: 5,
        status: 'Healthy'
      });
    }

    res.status(201).json(newHospital);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating hospital' });
  }
};

const updateHospital = async (req, res) => {
  try {
    const updated = await db.hospitals.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating hospital' });
  }
};

module.exports = {
  getHospitals,
  getHospitalById,
  createHospital,
  updateHospital
};
