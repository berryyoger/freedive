import express from 'express';
import DivePoint from '../models/DivePoint.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const points = await DivePoint.find().sort({ createdAt: -1 });
  res.json({ points });
});

export default router;
