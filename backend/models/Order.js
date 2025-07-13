const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'delivered', 'cancelled'], default: 'pending' },
  deliveryAddress: { type: String },
  phone: { type: String },
  deliveryType: { type: String, enum: ['pickup', 'delivery'], default: 'delivery' },
  deliveryTracking: {
    statusHistory: [
      {
        status: { type: String },
        timestamp: { type: Date, default: Date.now }
      }
    ],
    estimatedDeliveryTime: { type: Date },
    trackingNumber: { type: String }
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema); 