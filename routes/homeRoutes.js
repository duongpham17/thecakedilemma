const express = require('express')
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', homeController.getFeed);
router.post('/', authController.protect, homeController.createFeed);
router.delete('/:id', authController.protect, homeController.deleteFeed);

router.get('/best', homeController.getBestProducts);

router.get('/images', homeController.getImages);
router.post('/images', authController.protect, homeController.uploadImage)
router.delete('/images/:id', authController.protect, homeController.deleteImage);

module.exports = router