import mongoose from 'mongoose';

const divePointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  description: { type: String, default: '' },
  difficulty: { type: String, enum: ['쉬움', '보통', '어려움'], default: '보통' },
  image: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('DivePoint', divePointSchema);
