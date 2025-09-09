import express from 'express';
import Booking from '../models/Booking.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// 내 예약 목록
router.get('/', authRequired, async (req, res) => {
  const list = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ bookings: list });
});

// 예약 생성
router.post('/', authRequired, async (req, res) => {
  const { courseName, date, time, location, numPeople = 1, notes = '' } = req.body;
  if (!courseName || !date || !time || !location) {
    return res.status(400).json({ error: '필수 항목 누락' });
  }
  const b = await Booking.create({ user: req.user.id, courseName, date, time, location, numPeople, notes });
  res.status(201).json({ booking: b });
});

export default router;
