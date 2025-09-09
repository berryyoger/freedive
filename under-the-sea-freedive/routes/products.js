import express from 'express';
import Product from '../models/Product.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// 상품 목록
router.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json({ products });
});

// 상품 상세
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ error: '상품 없음' });
  res.json({ product: p });
});

// (데모) 상품 추가 - 인증 필요(실서비스는 관리자 권한 필요)
router.post('/', authRequired, async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json({ product: p });
});

export default router;
