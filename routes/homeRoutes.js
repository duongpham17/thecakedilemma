const express = require('express')
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/', homeController.getFeed);
router.post('/', homeController.createFeed);
router.delete('/:id', homeController.deleteFeed);

module.exports = router