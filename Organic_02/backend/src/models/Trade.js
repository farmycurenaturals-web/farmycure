const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true, min: 100 },
  timezone: { type: String, required: true, default: 'Asia/Kolkata' },
  preferredTime: { type: String, required: true },
  contactMethod: { type: String, required: true, enum: ['Call', 'WhatsApp', 'Email'] },
  legalName: { type: String, required: true },
  gst: { type: String, required: true },
  message: { type: String, maxlength: 200, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);
