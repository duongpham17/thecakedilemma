const express = require('express')
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/feeds', homeController.getFeed);
router.post('/feeds', authController.protect, homeController.createFeed);
router.delete('/feeds/:id', authController.protect, homeController.deleteFeed);

router.get('/best', homeController.getBestProducts);

router.get('/images', homeController.getImages);
router.post('/images', authController.protect, homeController.uploadImage)
router.delete('/images/:id', authController.protect, homeController.deleteImage);

router.get('/questions', homeController.getQuestions)
router.post('/questions', homeController.createQuestion)
router.delete('/questions/:id', homeController.deleteQuestion)

module.exports = router