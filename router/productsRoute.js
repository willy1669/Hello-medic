const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//GET graduate listing.
router.post('/create', productsController.createProduct);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductsById);
router.get('/remove', productsController.deleteProduct)
//router.get('/search', firstAidController.searchFirstAid);

module.exports = router;