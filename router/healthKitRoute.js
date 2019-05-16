const express = require('express');
const router = express.Router();
const healthKitController = require('../controllers/healthKitController');

//GET graduate listing.
router.post('/create', healthKitController.addHealthKit);
router.get('/', healthKitController.getHealthKit);
//router.get('/:id', healthKitController.getHealthKitById);
router.get('/search', healthKitController.searchHealthKits);

module.exports = router;