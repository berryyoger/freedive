import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// 라우터 임포트
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import bookingsRouter from './routes/bookings.js';
import postsRouter from './routes/posts.js';
import eventsRouter from './routes/events.js';
import divepointsRouter from './routes/divepoints.js';
import marineRouter from './routes/marine.js';
import divelogsRouter from './routes/divelogs.js';

dotenv.config();
const app = express();

// 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.options('*', cors()); // OPTIONS 자동 204 처리 (405 방지)

// DB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log('✅ Mongo connected'))
  .catch(err=>{ console.error('❌ Mongo error', err); process.exit(1); });

// 라우터 마운트 (프런트와 정확히 일치하는 경로)
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/divepoints', divepointsRouter);
app.use('/api/marine', marineRouter);
app.use('/api/divelogs', divelogsRouter);

// 헬스체크
app.get('/health', (req,res)=>res.json({ok:true}));

// 404 핸들러
app.use('/api', (req,res)=>res.status(404).json({ error:'API route not found', path:req.originalUrl }));

// 에러 핸들러
app.use((err,req,res,next)=>{
  console.error('💥', err);
  res.status(err.status||500).json({ error: err.message||'서버 오류' });
});

// 서버 시작
app.listen(process.env.PORT || 3000, ()=>{
  console.log(`🚀 API server http://localhost:${process.env.PORT||3000}`);
});
