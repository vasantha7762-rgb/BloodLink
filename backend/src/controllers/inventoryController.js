const db = require('../config/db');

const getInventory = async (req, res) => {
  try {
    const { hospitalId, bloodGroup, status } = req.query;
    let items = await db.bloodInventory.find();

    if (hospitalId) {
      items = items.filter(i => i.hospitalId === hospitalId);
    }
    if (bloodGroup) {
      items = items.filter(i => i.bloodGroup === bloodGroup);
    }
    if (status) {
      items = items.filter(i => i.status === status);
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching inventory' });
  }
};

const createInventoryItem = async (req, res) => {
  try {
    const { hospitalId, hospitalName, bloodGroup, availableUnits, minimumLevel = 5 } = req.body;

    let status = 'Healthy';
    if (availableUnits <= 2) status = 'Critical';
    else if (availableUnits <= minimumLevel) status = 'Low';

    const item = await db.bloodInventory.create({
      hospitalId,
      hospitalName,
      bloodGroup,
      availableUnits: parseInt(availableUnits, 10),
      minimumLevel: parseInt(minimumLevel, 10),
      status
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error adding inventory' });
  }
};

const updateInventoryItem = async (req, res) => {
  try {
    const { availableUnits, minimumLevel } = req.body;
    const current = await db.bloodInventory.findById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: 'Inventory record not found' });
    }

    const units = availableUnits !== undefined ? parseInt(availableUnits, 10) : current.availableUnits;
    const minLvl = minimumLevel !== undefined ? parseInt(minimumLevel, 10) : current.minimumLevel;

    let status = 'Healthy';
    if (units <= 2) status = 'Critical';
    else if (units <= minLvl) status = 'Low';

    const updated = await db.bloodInventory.findByIdAndUpdate(req.params.id, {
      availableUnits: units,
      minimumLevel: minLvl,
      status,
      lastUpdated: new Date().toISOString()
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating inventory' });
  }
};

module.exports = {
  getInventory,
  createInventoryItem,
  updateInventoryItem
};
