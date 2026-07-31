const express = require('express');
const router = express.Router();
const { login, register, forgotPassword, resetPassword, socialLogin } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/social-login', socialLogin);

module.exports = router;
