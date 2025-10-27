import express from 'express';
import Post from '../models/Post.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('user', 'name level').sort({ createdAt: -1 });
  res.json({ posts });
});

router.post('/', authRequired, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: '제목/내용을 입력하세요.' });
  const p = await Post.create({ user: req.user.id, title, content });
  res.status(201).json({ post: p });
});

export default router;
