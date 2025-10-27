import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, default: '기타' },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
