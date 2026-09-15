// Vercel Serverless Function: /api/feedbacks
const fs = require('fs');
const path = require('path');

const tmpFile = path.join('/tmp', 'feedbacks.json');

function readData() {
  try {
    if (fs.existsSync(tmpFile)) {
      return JSON.parse(fs.readFileSync(tmpFile, 'utf8') || '[]');
    }
  } catch (e) {}
  return [];
}

function writeData(data) {
  try {
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let entries = readData();

  if (req.method === 'GET') {
    return res.status(200).json(entries);
  }

  if (req.method === 'POST') {
    try {
      const entry = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!entry || !entry.id) {
        return res.status(400).json({ error: 'Invalid payload' });
      }

      const idx = entries.findIndex(e => e.id === entry.id);
      if (idx !== -1) {
        entries[idx] = entry;
      } else {
        entries.unshift(entry);
      }

      writeData(entries);
      return res.status(200).json({ success: true, count: entries.length, entry });
    } catch (err) {
      return res.status(400).json({ error: 'Malformed payload' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const id = payload.id || req.query.id;
      if (id === 'ALL') {
        entries = [];
      } else {
        entries = entries.filter(e => e.id !== id);
      }

      writeData(entries);
      return res.status(200).json({ success: true, count: entries.length });
    } catch (err) {
      return res.status(500).json({ error: 'Delete failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
