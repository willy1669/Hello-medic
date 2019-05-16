const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/temporaryToken');


//GET graduate listing.
router.post('/signUp', userController.userSignUp);
router.post('/login', authMiddleware.validateToken, userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/logout', userController.logOutUser)

module.exports = router;