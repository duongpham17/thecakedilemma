const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/varieties', productController.varietyBox);

router.get('/', productController.getProducts);
router.get('/one/:title', productController.getOneProduct);
router.patch('/basket/:id/:sign', productController.updateQuantity);

router.get('/reviews/:id/:user', productController.getReviews);
router.post('/reviews', authController.protect, productController.createReview);
router.delete('/reviews/:id', authController.protect, productController.deleteReview);

module.exports = router