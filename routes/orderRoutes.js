const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/zero-checkout', orderController.createZeroGrandTotalOrder);
router.post('/checkout', orderController.checkout);
router.get('/gift-card-checkout/:id', orderController.applyGiftCardBalance);
router.post('/', orderController.createOrder);
router.get('/', authController.protect, orderController.getOrders);

router.get('/admin', authController.protect, orderController.getAdminOrders);
router.patch('/complete/:id/:type', authController.protect, orderController.completeOrder);
router.patch('/delete/:id', authController.protect, orderController.deleteOrder);

router.post('/gift-card-session', orderController.createGiftCardSession);
router.get('/gift-card-balance/:id', orderController.getGiftCardBalance);

//testing
router.post('/checkout-session', orderController.createOrderCheckoutSession )

module.exports = router