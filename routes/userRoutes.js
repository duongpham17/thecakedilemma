const express = require('express')
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signup/confirm', authController.signupConfirm);
router.post('/login/:choice', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.post('/contact', userController.contactMe);

router.use(authController.protect);
router.get('/', authController.loggedIn);
router.get('/data', userController.loadUserData);
router.patch('/account', userController.updateUserInfo);
router.delete('/account', authController.deleteAccount);
router.put('/address', userController.addAddress);
router.delete('/address/:id', userController.removeAddress);

module.exports = router