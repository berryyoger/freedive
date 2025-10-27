import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseName: { type: String, required: true },
  date: { type: String, required: true }, // '2025-09-30'
  time: { type: String, required: true }, // '10:00'
  location: { type: String, required: true },
  numPeople: { type: Number, default: 1 },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['예약요청', '확정', '취소'], default: '예약요청' }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
