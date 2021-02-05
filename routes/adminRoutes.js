const express = require('express')
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect)

router.patch('/data/:id', adminController.updateData);

router.get('/products', adminController.getProducts)
router.post('/products', adminController.createProduct);
router.delete('/products/:id', adminController.deleteProduct);
router.patch('/products/:id/:boolean', adminController.activateProduct);

router.get('/find/:type/:id', adminController.findOrder);
router.get('/find/stats', adminController.findStats);

router.get('/edit/:id', adminController.getProductToEdit);
router.patch('/edit/:id', adminController.updateProduct);
router.put('/edit/images/:id', adminController.uploadImage);
router.delete('/edit/images/:id/:image_id', adminController.deleteImage);

router.post('/gift', adminController.createGiftCard);
router.delete('/gift', adminController.deleteExpiredGiftCards);

router.get('/varieties', adminController.getVarieties);
router.post('/varieties', adminController.createVariety);
router.put('/varieties/:id', adminController.addProductToVariety);
router.patch('/varieties/:id', adminController.updateProductInVariety);
router.delete('/varieties/:id', adminController.deleteVarietyBox);
router.patch('/varieties/active/:id/:boolean', adminController.setVarietyActive);
router.delete('/varieties/:id/:itemId', adminController.deleteItemInVarietyBox);

module.exports = router