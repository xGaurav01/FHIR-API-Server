const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers.js');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
