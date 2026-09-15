/* ==========================================================
   Xacro Experiences — Central JSON File Storage Server
   Zero-dependency Node.js HTTP Server
   Serves static assets and provides REST API for data/feedbacks.json
   ========================================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DATA_DIR = path.join(__dirname, 'data');
const FEEDBACKS_FILE = path.join(DATA_DIR, 'feedbacks.json');
const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const ROOMS_FILE = path.join(DATA_DIR, 'rooms.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure JSON files exist with initial empty array if not present
function ensureJsonFile(filePath, defaultData = []) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
  }
}

ensureJsonFile(FEEDBACKS_FILE, []);

// Helper to read JSON file safely
function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return [];
  }
}

// Helper to write JSON file safely
function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
}

// MIME types map for static files
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // CORS Headers for API calls
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  /* ---------------------------------------------------------
     API ENDPOINTS: /api/feedbacks
     --------------------------------------------------------- */
  if (pathname === '/api/feedbacks') {
    if (req.method === 'GET') {
      const entries = readJson(FEEDBACKS_FILE);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(entries));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const entry = JSON.parse(body);
          if (!entry || !entry.id) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid feedback entry payload' }));
            return;
          }

          const entries = readJson(FEEDBACKS_FILE);
          // Check if already exists (update or insert at top)
          const existingIdx = entries.findIndex(e => e.id === entry.id);
          if (existingIdx !== -1) {
            entries[existingIdx] = entry;
          } else {
            entries.unshift(entry);
          }

          writeJson(FEEDBACKS_FILE, entries);
          console.log(`[API] Saved feedback entry: ${entry.id} (${entry.guest?.name || 'Guest'})`);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, count: entries.length, entry }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Malformed JSON payload' }));
        }
      });
      return;
    }

    if (req.method === 'DELETE') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const id = payload.id || parsedUrl.searchParams.get('id');
          if (!id) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing entry id to delete' }));
            return;
          }

          let entries = readJson(FEEDBACKS_FILE);
          if (id === 'ALL') {
            entries = [];
          } else {
            entries = entries.filter(e => e.id !== id);
          }

          writeJson(FEEDBACKS_FILE, entries);
          console.log(`[API] Deleted feedback entry ID: ${id}`);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, count: entries.length }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Delete operation failed' }));
        }
      });
      return;
    }
  }

  /* ---------------------------------------------------------
     API ENDPOINTS: /api/properties
     --------------------------------------------------------- */
  if (pathname === '/api/properties') {
    if (req.method === 'GET') {
      const properties = readJson(PROPERTIES_FILE);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(properties));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const props = JSON.parse(body);
          if (Array.isArray(props)) {
            writeJson(PROPERTIES_FILE, props);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, properties: props }));
            return;
          }
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Expected array of properties' }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Malformed JSON payload' }));
        }
      });
      return;
    }
  }

  /* ---------------------------------------------------------
     STATIC FILE SERVING
     --------------------------------------------------------- */
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(__dirname, safePath);

  // Security check: stay inside directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  Silver Rain Suites — JSON File Storage Server`);
  console.log(`  Running live at: http://localhost:${PORT}`);
  console.log(`  Storing central feedback in: data/feedbacks.json`);
  console.log(`====================================================`);
});
