// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

// 🔌 DB 연결
import './config/db.js';

import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import bookingsRouter from './routes/bookings.js';
import postsRouter from './routes/posts.js';
import eventsRouter from './routes/events.js';
import divepointsRouter from './routes/divepoints.js';
import marineRouter from './routes/marine.js';
import divelogsRouter from './routes/divelogs.js';

const app = express();

// 미들웨어
app.use(cors({
  origin: true,              // 개발 중에는 모두 허용
  credentials: false,        // 쿠키 안 쓰면 false
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS']
}));
app.use(morgan('dev'));
app.use(express.json());

// 헬스체크
app.get('/health', (req, res) => res.json({ ok: true }));

// API 라우트 마운트 (404보다 먼저!)
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/divepoints', divepointsRouter);
app.use('/api/marine', marineRouter);
app.use('/api/divelogs', divelogsRouter);

// 404 핸들러 (항상 마지막에)
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found', path: req.originalUrl });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error('💥', err);
  res.status(err.status || 500).json({ error: err.message || '서버 오류' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API server http://localhost:${PORT}`);
});