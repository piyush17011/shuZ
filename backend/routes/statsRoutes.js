const express = require('express');
const { getStats } = require('../controller/statsController');

const router = express.Router();

// GET stats (calculated live from database)
router.get('/', getStats);

module.exports = router;
