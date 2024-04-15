const express = require('express');
const router = express.Router();
const { resetPassword } = require('../controllers/resetPasswordController');

router
  .post('/:id/:resetToken', resetPassword)

module.exports = router;