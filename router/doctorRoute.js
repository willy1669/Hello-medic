const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

//GET graduate listing.
router.post('/signUp', doctorController.doctorSignUp);
router.post('/login', doctorController.loginUser);

module.exports = router;