const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

//GET graduate listing.
router.post('/signUp', adminController.adminSignUp);

module.exports = router;