const express = require('express')
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/checkout', orderController.checkout);
router.post('/', orderController.createOrder);
router.get('/', authController.protect, orderController.getOrders);
router.get('/admin', authController.protect, orderController.getAdminOrders);
router.patch('/complete/:id/:type', authController.protect, orderController.completeOrder);

module.exports = router