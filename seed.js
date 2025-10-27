import dotenv from 'dotenv';
dotenv.config();

import './config/db.js';
import Product from './models/Product.js';
import DivePoint from './models/DivePoint.js';

const seed = async () => {
  await Product.deleteMany({});
  await DivePoint.deleteMany({});

  await Product.insertMany([
    { name: '프리다이빙 마스크', price: 69000, description: '저부력 실리콘 마스크', image: '/assets/mask.png', category: '마스크', stock: 25 },
    { name: '롱핀(카본)', price: 390000, description: '탄성 좋은 카본 롱핀', image: '/assets/fin.png', category: '롱핀', stock: 10 },
    { name: '스노클', price: 29000, description: '드레인 밸브 내장', image: '/assets/snorkel.png', category: '스노클', stock: 50 },
  ]);

  await DivePoint.insertMany([
    { name: '제주 범섬', lat: 33.2044, lng: 126.5333, description: '용암 지형과 풍부한 어류', difficulty: '보통', image: '/assets/jeju.jpg' },
    { name: '후포 앞바다', lat: 36.6769, lng: 129.4481, description: '동해 수온/시야 좋은 편', difficulty: '보통', image: '/assets/eastsea.jpg' },
  ]);

  console.log('✅ Seed completed'); 
  process.exit(0);
};

seed();
