const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Admin routes
router.get('/', auth, admin, userController.getAllUsers);
router.get('/:id', auth, admin, userController.getUserById);
router.delete('/:id', auth, admin, userController.deleteUser);

// User self-service
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

module.exports = router; 