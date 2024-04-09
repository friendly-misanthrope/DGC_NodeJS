const express = require('express');
const router = express.Router();

// User controller functions
const {
  getAllUsersWithEmployee
} = require('../../controllers/usersController');

// Users root router
router.route('/')
  .get(getAllUsersWithEmployee);

  module.exports = router;