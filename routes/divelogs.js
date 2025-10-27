import express from 'express';
import DiveLog from '../models/DiveLog.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// 내 로그
router.get('/', authRequired, async (req, res) => {
  const logs = await DiveLog.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ logs });
});

// 작성
router.post('/', authRequired, async (req, res) => {
  const { date, location, depth = 0, duration = 0, visibility = 0, temperature = 0, suit = '', notes = '' } = req.body;
  if (!date || !location) return res.status(400).json({ error: '날짜와 장소는 필수입니다.' });
  const log = await DiveLog.create({ user: req.user.id, date, location, depth, duration, visibility, temperature, suit, notes });
  res.status(201).json({ log });
});

export default router;
