const db = require('../config/db');

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    let list = await db.notifications.find();
    list = list.filter(n => n.userId === userId || n.userId === 'global' || n.userId === 'all');
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching notifications' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const updated = await db.notifications.findByIdAndUpdate(req.params.id, { isRead: true });
    if (!updated) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating notification' });
  }
};

module.exports = {
  getNotifications,
  markAsRead
};
