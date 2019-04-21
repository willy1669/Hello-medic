const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

//GET graduate listing.
router.post('/signUp', doctorController.doctorSignUp);
router.post('/login', doctorController.loginUser);
router.get('/', doctorController.getDoctors);
//router.post('addProfile', doctorController.addProfile);

module.exports = router;