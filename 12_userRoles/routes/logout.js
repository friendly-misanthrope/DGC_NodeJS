const express = require('express');
const router = express.Router();
const { userLogout } = require('../controllers/logoutController');

router.get('/', userLogout);

module.exports = router;