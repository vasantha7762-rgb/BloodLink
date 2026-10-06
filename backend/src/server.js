const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db');
const { seedDatabase } = require('./seed/seedData');

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Auto-seed database if empty
(async () => {
  try {
    const usersCount = await db.users.countDocuments();
    if (usersCount === 0) {
      console.log('Database empty. Automatically populating initial seed data...');
      await seedDatabase();
    }
  } catch (err) {
    console.error('Auto-seed check error:', err);
  }
})();

// Route Registrations
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donors', require('./routes/donorRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/hospitals', require('./routes/hospitalRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root & Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'BloodLink Healthcare Network',
    timestamp: new Date().toISOString()
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` BloodLink Backend Server Running on Port ${PORT}`);
  console.log(` Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
