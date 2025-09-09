import mongoose from 'mongoose';

const diveLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  location: { type: String, required: true },
  depth: { type: Number, default: 0 },
  duration: { type: Number, default: 0 }, // minutes
  visibility: { type: Number, default: 0 }, // meters
  temperature: { type: Number, default: 0 }, // °C
  suit: { type: String, default: '' },
  notes: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('DiveLog', diveLogSchema);
