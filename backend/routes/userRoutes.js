const express = require('express');
const { registerUser, loginUser, logoutUser, getUsers, updateRole } = require('../controller/userController');
const authenticateToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/logout', logoutUser);
router.get('/allUser', authenticateToken, isAdmin, getUsers);
router.patch('/role', authenticateToken, isAdmin, updateRole);

module.exports = router;