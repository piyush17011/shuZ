const express = require('express');
const { registerUser, loginUser, getUsers, updateRole } = require('../controller/userController');
const authenticateToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/allUser', authenticateToken, isAdmin, getUsers);
router.patch('/role', authenticateToken, isAdmin, updateRole);

module.exports = router;