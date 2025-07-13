const Order = require('../models/Order');

// Create order (user)
exports.createOrder = async (req, res) => {
  try {
    const { orderItems, totalPrice, deliveryAddress, phone, deliveryType } = req.body;
    const order = new Order({
      user: req.user.id,
      orderItems,
      totalPrice,
      deliveryAddress,
      phone,
      deliveryType
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: 'Error creating order', error: err.message });
  }
};

// Get my orders (user)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('orderItems.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('orderItems.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get order by ID (user/admin)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('orderItems.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // Only allow owner or admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email').populate('orderItems.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: 'Error updating order', error: err.message });
  }
};

// Delete order (admin)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Generate WhatsApp order link
exports.getWhatsAppLink = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // Only allow owner or admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const phone = process.env.WHATSAPP_NUMBER || '254700000000';
    const items = order.orderItems.map(item => `${item.quantity} x ${item.product.name}`).join(', ');
    const text = encodeURIComponent(`Order for: ${items}\nTotal: KES ${order.totalPrice}\nDelivery: ${order.deliveryType}`);
    const url = `https://wa.me/${phone}?text=${text}`;
    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get delivery tracking info
exports.getDeliveryTracking = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // Only allow owner or admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order.deliveryTracking || {});
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update delivery tracking (admin)
exports.updateDeliveryTracking = async (req, res) => {
  try {
    const { status, estimatedDeliveryTime, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // Add status to history
    if (status) {
      if (!order.deliveryTracking) order.deliveryTracking = {};
      if (!order.deliveryTracking.statusHistory) order.deliveryTracking.statusHistory = [];
      order.deliveryTracking.statusHistory.push({ status, timestamp: new Date() });
    }
    if (estimatedDeliveryTime) order.deliveryTracking.estimatedDeliveryTime = estimatedDeliveryTime;
    if (trackingNumber) order.deliveryTracking.trackingNumber = trackingNumber;
    await order.save();
    res.json(order.deliveryTracking);
  } catch (err) {
    res.status(400).json({ message: 'Error updating delivery tracking', error: err.message });
  }
}; 