const express = require('express');
const router = express.Router();
const { userRefreshToken } = require('../controllers/refreshTokenController');

router.get('/', userRefreshToken);

module.exports = router;