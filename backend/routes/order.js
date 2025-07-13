const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// User routes
router.post('/', auth, orderController.createOrder);
router.get('/my', auth, orderController.getMyOrders);
router.get('/:id', auth, orderController.getOrderById);

// Admin routes
router.get('/', auth, admin, orderController.getAllOrders);
router.put('/:id/status', auth, admin, orderController.updateOrderStatus);
router.delete('/:id', auth, admin, orderController.deleteOrder);

// WhatsApp order link
router.get('/:id/whatsapp-link', auth, orderController.getWhatsAppLink);
// Delivery tracking
router.get('/:id/delivery-tracking', auth, orderController.getDeliveryTracking);
router.put('/:id/delivery-tracking', auth, admin, orderController.updateDeliveryTracking);

module.exports = router; 