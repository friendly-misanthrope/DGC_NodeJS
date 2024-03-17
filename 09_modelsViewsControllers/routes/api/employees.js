const express = require('express');
const router = express.Router();
const { 
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee 
} = require('../../controllers/employeesController');

// Index router
router.route('/')
  .get(getAllEmployees)
  .post(createEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

// API endpoint for a specific employee 
router.route('/:id')
  .get(getOneEmployee);


module.exports = router;