const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

class Collection {
  constructor(name) {
    this.name = name;
    this.filePath = path.join(dataDir, `${name}.json`);
    this.init();
  }

  init() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  _read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data || '[]');
    } catch (e) {
      return [];
    }
  }

  _write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  async find(filter = {}) {
    const items = this._read();
    return items.filter(item => {
      for (const key in filter) {
        if (filter[key] === undefined) continue;
        if (Array.isArray(filter[key])) {
          if (!filter[key].includes(item[key])) return false;
        } else if (typeof filter[key] === 'object' && filter[key] !== null) {
          if (filter[key].$ne !== undefined && item[key] === filter[key].$ne) return false;
          if (filter[key].$in !== undefined && !filter[key].$in.includes(item[key])) return false;
        } else if (item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  async findOne(filter = {}) {
    const items = await this.find(filter);
    return items.length > 0 ? items[0] : null;
  }

  async findById(id) {
    const items = this._read();
    return items.find(item => item.id === id || item._id === id) || null;
  }

  async create(doc) {
    const items = this._read();
    const newDoc = {
      id: doc.id || doc._id || 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      _id: doc.id || doc._id || 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...doc
    };
    items.push(newDoc);
    this._write(items);
    return newDoc;
  }

  async findByIdAndUpdate(id, update, options = { new: true }) {
    const items = this._read();
    const index = items.findIndex(item => item.id === id || item._id === id);
    if (index === -1) return null;

    const current = items[index];
    const updated = {
      ...current,
      ...update,
      updatedAt: new Date().toISOString()
    };

    items[index] = updated;
    this._write(items);
    return options.new ? updated : current;
  }

  async findByIdAndDelete(id) {
    const items = this._read();
    const index = items.findIndex(item => item.id === id || item._id === id);
    if (index === -1) return null;
    const deleted = items.splice(index, 1)[0];
    this._write(items);
    return deleted;
  }

  async countDocuments(filter = {}) {
    const items = await this.find(filter);
    return items.length;
  }

  async deleteMany(filter = {}) {
    let items = this._read();
    const toDelete = await this.find(filter);
    const deleteIds = new Set(toDelete.map(d => d.id));
    items = items.filter(i => !deleteIds.has(i.id));
    this._write(items);
    return { deletedCount: deleteIds.size };
  }
}

const db = {
  users: new Collection('users'),
  donors: new Collection('donors'),
  patients: new Collection('patients'),
  hospitals: new Collection('hospitals'),
  bloodRequests: new Collection('bloodRequests'),
  donations: new Collection('donations'),
  bloodInventory: new Collection('bloodInventory'),
  notifications: new Collection('notifications')
};

module.exports = db;
