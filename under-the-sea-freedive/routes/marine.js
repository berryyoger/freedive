import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Open-Meteo Marine API (no key) example
router.get('/', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat,lng required' });
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height,wind_wave_height,wind_speed_10m&timezone=auto`;
  try {
    const r = await fetch(url);
    const j = await r.json();
    res.json(j);  
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Marine API 오류' });
  }
});

export default router;
