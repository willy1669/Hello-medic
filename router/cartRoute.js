const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/temporaryToken');

//GET graduate listing.
router.post('/add-to-cart/', authMiddleware.validateToken, cartController.addToCart);
router.get('/', cartController.getAllCarts);
router.post('/checkOut', authMiddleware.validateToken, cartController.checkOut);

module.exports = router;
