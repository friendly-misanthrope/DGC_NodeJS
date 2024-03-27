const express = require('express');
const router = express.Router();

// Employee controller functions
const { 
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee 
} = require('../../controllers/employeesController');

// Employees root router
router.route('/')
  .get(getAllEmployees)
  .post(createEmployee);
  
// API endpoint for a specific employee 
router.route('/:id')
  .get(getOneEmployee)
  .delete(deleteEmployee)
  .put(updateEmployee);

module.exports = router;