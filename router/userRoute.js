const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//GET graduate listing.
router.post('/signUp', userController.userSignUp);
router.post('/login', userController.loginUser);
// router.post('/appointment', userController.bookAnAppointment);

module.exports = router;