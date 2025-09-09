import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import './config/db.js';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import bookingRoutes from './routes/bookings.js';
import divePointRoutes from './routes/divepoints.js';
import diveLogRoutes from './routes/divelogs.js';
import postRoutes from './routes/posts.js';
import eventRoutes from './routes/events.js';
import marineRoutes from './routes/marine.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/divepoints', divePointRoutes);
app.use('/api/divelogs', diveLogRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/marine', marineRoutes);

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index or specific pages
app.get('*', (req, res) => {
  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌊 Under the Sea server running at http://localhost:${PORT}`));

//test at mac