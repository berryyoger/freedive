import express from 'express';
import Event from '../models/Event.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.find().sort({ startDate: 1 });
  res.json({ events });
});

router.post('/', authRequired, async (req, res) => {
  const { title, startDate, endDate, location = '', description = '', link = '' } = req.body;
  if (!title || !startDate || !endDate) return res.status(400).json({ error: '필수 항목 누락' });
  const ev = await Event.create({ title, startDate, endDate, location, description, link });
  res.status(201).json({ event: ev });
});

export default router;
