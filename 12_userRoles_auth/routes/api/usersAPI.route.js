const express = require('express');
const router = express.Router();

// User controller functions
const {
  getAllUsersWithEmployee,
  getAllUsers
} = require('../../controllers/usersController');

// Users root router
router.route('/')
  .get(getAllUsersWithEmployee);

router.route('/all')
  .get(getAllUsers)

  module.exports = router;