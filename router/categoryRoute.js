const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//GET graduate listing.
router.post('/create', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/search', categoryController.searchBycategory);
//router.get('/:id', healthKitController.getHealthKitById);
//router.get('/search', healthKitController.searchHealthKits);

module.exports = router;