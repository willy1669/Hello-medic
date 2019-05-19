const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
//const authMiddleware = require('../middleware/temporaryToken');

//GET graduate listing.
router.post('/bookAppointment/', appointmentController.bookAppointment);

module.exports = router;
