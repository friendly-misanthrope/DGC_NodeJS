const express = require('express');
const router = express.Router();

// User controller functions
const {
  getAllUsersWithEmployee,
  getAllUsers,
  updateUser,
  getOneUser
} = require('../../controllers/usersController');

// Users root router
router.route('/')
  .get(getAllUsers);

router.route('/all')
  .get(getAllUsersWithEmployee);
  
router.route('/:id')
  .get(getOneUser)
  .put(updateUser);


  
module.exports = router;