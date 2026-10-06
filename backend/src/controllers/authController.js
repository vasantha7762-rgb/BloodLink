const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'bloodlink_super_secret_jwt_key_2026_healthtech',
    { expiresIn: '30d' }
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password, role = 'donor', phone, bloodGroup, city, hospitalName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingUser = await db.users.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.users.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      phone: phone || ''
    });

    // Create profile according to role
    if (role === 'donor') {
      await db.donors.create({
        userId: newUser.id,
        name,
        email: newUser.email,
        phone: phone || '',
        bloodGroup: bloodGroup || 'O+',
        city: city || 'New York',
        location: city || 'New York',
        availability: 'available',
        lastDonationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        totalDonations: 0,
        verificationStatus: 'verified'
      });
    } else if (role === 'patient') {
      await db.patients.create({
        userId: newUser.id,
        name,
        email: newUser.email,
        phone: phone || '',
        city: city || 'New York',
        location: city || 'New York'
      });
    } else if (role === 'hospital') {
      const hospitalDoc = await db.hospitals.create({
        userId: newUser.id,
        name: hospitalName || name,
        email: newUser.email,
        phone: phone || '',
        address: city || '123 Medical Center Way',
        city: city || 'New York',
        verificationStatus: 'verified',
        contactPerson: name
      });

      // Default inventory for hospital
      const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      for (const bg of groups) {
        await db.bloodInventory.create({
          hospitalId: hospitalDoc.id,
          hospitalName: hospitalDoc.name,
          bloodGroup: bg,
          availableUnits: Math.floor(Math.random() * 15) + 5,
          minimumLevel: 5,
          status: 'Healthy'
        });
      }
    }

    const token = generateToken(newUser);

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await db.users.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error during login' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profileData = null;
    if (user.role === 'donor') {
      profileData = await db.donors.findOne({ userId: user.id });
    } else if (user.role === 'patient') {
      profileData = await db.patients.findOne({ userId: user.id });
    } else if (user.role === 'hospital') {
      profileData = await db.hospitals.findOne({ userId: user.id });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profile: profileData
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching user' });
  }
};

module.exports = { register, login, getMe };
