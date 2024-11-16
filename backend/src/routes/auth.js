const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

// Endpoint đăng ký
router.post('/register', authController.register);

// Endpoint đăng nhập
router.post('/login', authController.login);

router.get('/user', verifyToken, authController.getUser);

module.exports = router;



