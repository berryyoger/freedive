import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 중복 이메일 확인
router.get('/check-email', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const exists = await User.exists({ email });
  res.json({ exists: !!exists });
});

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, password2, level, certs = [], termsAgreed } = req.body;

    if (!name || !email || !password || !password2) {
      return res.status(400).json({ error: '모든 필드를 입력하세요.' });
    }
    if (!validEmail(email)) {
      return res.status(400).json({ error: '이메일 형식이 올바르지 않습니다.' });
    }
    if (password !== password2) {
      return res.status(400).json({ error: '비밀번호 확인이 일치하지 않습니다.' });
    }
    if (!termsAgreed) {
      return res.status(400).json({ error: '개인정보 이용약관에 동의해야 합니다.' });
    }
    const dup = await User.findOne({ email });
    if (dup) return res.status(409).json({ error: '이미 사용 중인 이메일입니다.' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hash,
      level: level || '초보자',
      certs,
      termsAgreed: true
    });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, level: user.level, certs: user.certs } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: '잘못된 이메일 또는 비밀번호입니다.' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: '잘못된 이메일 또는 비밀번호입니다.' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, level: user.level, certs: user.certs } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 내 정보
router.get('/me', authRequired, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
});

// 비밀번호 찾기(데모): 콘솔에 재설정 링크 출력
router.post('/forgot', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const user = await User.findOne({ email });
  if (!user) return res.json({ ok: true, message: '이메일이 전송되었습니다(데모).' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const link = `http://localhost:${process.env.PORT || 3000}/reset-password?token=${token}`;
  console.log('🔐 [DEMO] Password reset link:', link);
  res.json({ ok: true, message: '이메일이 전송되었습니다(데모). 콘솔을 확인하세요.' });
});

export default router;
