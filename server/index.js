import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Middlewares
app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { stats: { views: 0, totalHearts: 0 }, memories: [], photos: [], wishes: [], letters: [] };
  }
};

// Helper to write DB atomically
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing db.json:', err);
    return false;
  }
};

// ================= ROUTES ================= //

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'UKT-Memories Backend', timestamp: new Date().toISOString() });
});

// 2. Stats endpoint (increments views count once per request session)
app.get('/api/stats', (req, res) => {
  const db = readDB();
  db.stats = db.stats || { views: 0, totalHearts: 0 };
  db.stats.views = (db.stats.views || 0) + 1;
  writeDB(db);

  const totalHearts = (db.stats.totalHearts || 0) +
    db.photos.reduce((sum, p) => sum + (p.likes || 0), 0) +
    db.wishes.reduce((sum, w) => sum + (w.hearts || 0), 0);

  res.json({
    views: db.stats.views,
    totalHearts,
    totalPhotos: db.photos.length,
    totalWishes: db.wishes.length,
    totalMemories: db.memories.length
  });
});

// 3. Memories
app.get('/api/memories', (req, res) => {
  const db = readDB();
  res.json(db.memories || []);
});

app.post('/api/memories/:id/like', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id, 10);
  const memory = db.memories.find((m) => m.id === id);
  if (!memory) {
    return res.status(404).json({ error: 'Memory not found' });
  }
  memory.likes = (memory.likes || 0) + 1;
  db.stats.totalHearts = (db.stats.totalHearts || 0) + 1;
  writeDB(db);
  res.json({ success: true, likes: memory.likes });
});

// 4. Photos
app.get('/api/photos', (req, res) => {
  const db = readDB();
  const { category } = req.query;
  let list = db.photos || [];
  if (category && category !== 'all') {
    list = list.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
  }
  res.json(list);
});

app.post('/api/photos/:id/like', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  const photo = db.photos.find((p) => p.id === id || String(p.id) === String(id));
  if (!photo) {
    return res.status(404).json({ error: 'Photo not found' });
  }
  photo.likes = (photo.likes || 0) + 1;
  db.stats.totalHearts = (db.stats.totalHearts || 0) + 1;
  writeDB(db);
  res.json({ success: true, likes: photo.likes });
});

// 5. Wishes (Wall of Love)
app.get('/api/wishes', (req, res) => {
  const db = readDB();
  // Return wishes sorted by newest first
  const wishes = (db.wishes || []).slice().reverse();
  res.json(wishes);
});

app.post('/api/wishes', (req, res) => {
  const { name, message, emoji } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const db = readDB();
  const newWish = {
    id: 'w_' + Date.now(),
    name: name.trim().slice(0, 50),
    message: message.trim().slice(0, 300),
    emoji: emoji || '💖',
    hearts: 1,
    date: new Date().toISOString().split('T')[0]
  };

  db.wishes = db.wishes || [];
  db.wishes.push(newWish);
  db.stats.totalHearts = (db.stats.totalHearts || 0) + 1;
  writeDB(db);

  res.status(201).json(newWish);
});

app.post('/api/wishes/:id/heart', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  const wish = db.wishes.find((w) => w.id === id);
  if (!wish) {
    return res.status(404).json({ error: 'Wish not found' });
  }
  wish.hearts = (wish.hearts || 0) + 1;
  db.stats.totalHearts = (db.stats.totalHearts || 0) + 1;
  writeDB(db);
  res.json({ success: true, hearts: wish.hearts });
});

// 6. Letters
app.get('/api/letters', (req, res) => {
  const db = readDB();
  res.json(db.letters || []);
});

app.post('/api/letters/:id/like', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  const letter = db.letters.find((l) => l.id === id);
  if (!letter) {
    return res.status(404).json({ error: 'Letter not found' });
  }
  letter.likes = (letter.likes || 0) + 1;
  db.stats.totalHearts = (db.stats.totalHearts || 0) + 1;
  writeDB(db);
  res.json({ success: true, likes: letter.likes });
});

// Start server
app.listen(PORT, () => {
  console.log(`✨ UKT Memories Backend Server running on http://localhost:${PORT}`);
});
