// Vercel Serverless Function & Global Cloud Persistent Engine: /api/feedbacks
const https = require('https');
const fs = require('fs');
const path = require('path');

const CLOUD_DB_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a0a41dc38a0c8a';
const tmpFile = path.join('/tmp', 'feedbacks.json');

function fetchCloudData() {
  return new Promise((resolve) => {
    https.get(CLOUD_DB_URL, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          const entries = (parsed && parsed.data && Array.isArray(parsed.data.feedbacks)) ? parsed.data.feedbacks : [];
          resolve(entries);
        } catch (e) {
          resolve(readLocalTmp());
        }
      });
    }).on('error', () => resolve(readLocalTmp()));
  });
}

function saveCloudData(entries) {
  return new Promise((resolve) => {
    writeLocalTmp(entries);
    const payload = JSON.stringify({
      name: "xacro_experiences_global_db",
      data: { feedbacks: entries }
    });

    const req = https.request(CLOUD_DB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(true));
    });
    req.on('error', () => resolve(false));
    req.write(payload);
    req.end();
  });
}

function readLocalTmp() {
  try {
    if (fs.existsSync(tmpFile)) {
      return JSON.parse(fs.readFileSync(tmpFile, 'utf8') || '[]');
    }
  } catch (e) {}
  return [];
}

function writeLocalTmp(data) {
  try {
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let entries = await fetchCloudData();

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

      await saveCloudData(entries);
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

      await saveCloudData(entries);
      return res.status(200).json({ success: true, count: entries.length });
    } catch (err) {
      return res.status(500).json({ error: 'Delete failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
