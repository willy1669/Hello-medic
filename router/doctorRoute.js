const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/temporaryToken');

//GET graduate listing.
router.post('/signUp', doctorController.doctorSignUp);
router.post('/login', authMiddleware.validateToken, doctorController.loginUser);
router.get('/', doctorController.getDoctors);
router.get('/search/', doctorController.searchDoctors)
router.post('/createProfile', doctorController.createProfile);
router.get('/id', doctorController.getDoctorById);


module.exports = router;