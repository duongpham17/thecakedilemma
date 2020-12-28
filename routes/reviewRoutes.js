const express = require('express')
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect)

module.exports = router