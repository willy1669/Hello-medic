const express = require('express');
const router = express.Router();
const firstAidController = require('../controllers/firstAidController');

//GET graduate listing.
router.post('/create', firstAidController.createFirstAid);
router.get('/', firstAidController.getAllFirstAid);
router.get('/search', firstAidController.searchFirstAid);

module.exports = router;