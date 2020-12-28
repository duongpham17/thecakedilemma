const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/varieties', productController.varietyBox);

router.get('/', productController.getProducts);
router.get('/one/:title', productController.getOneProduct);
router.patch('/basket/:id/:sign', productController.updateQuantity);

module.exports = router