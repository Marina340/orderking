const express = require('express');
const {
  register,
  login,
  forgotPassword,
  getMe,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/forgotpassword', forgotPassword);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
