import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  level: { type: String, enum: ['초보자', '중급자', '전문가'], default: '초보자' },
  certs: [{ type: String }],
  termsAgreed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
