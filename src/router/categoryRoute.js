const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//GET graduate listing.
router.post('/create', categoryController.createCategory);
router.get('/allCategory', categoryController.getAllCategories);
//router.get('/', categoryController.getAcategory);
router.get('/:id', categoryController.getACategoryById)
//router.get('/:id', healthKitController.getHealthKitById);
//router.get('/search', healthKitController.searchHealthKits);

module.exports = router;