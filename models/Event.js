import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String, default: '' },
  description: { type: String, default: '' },
  link: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
