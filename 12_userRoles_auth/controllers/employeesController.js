const Employees = require('../models/employees.model');

// Get all
const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employees.find();
    res.status(200).json(allEmployees);
  } catch(e) {
    res.status(400)
    .json({
      message: "Unable to get all employees",
      error: e
    });
  }
}

// Get one
const getOneEmployee = async (req, res) => {
  try {
    // Find employee by id in URL
    const emp = await Employees.findById(req.params.id);
    // Send status 200 ok && the employee json data
    res.status(200).json(emp);
  } catch(e) {
    // If unable to get employee, send status 400
    // && json with a message and the error
    res.status(400).json({
      message: "Unable to get employee",
      error: e
    });
  }
}

// Create
const createEmployee = async (req, res) => {
  try {
    // Check if employee already exists in DB
    const potentialEmployee = await Employees.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    if (potentialEmployee) {
      // If employee already exists, send
      // '418 I'm A Teapot' and an error message
      res.status(418)
      .json({error: "This employee already exists"});
    } else {
      // Otherwise, create new employee && send it back in a 201 response
      const newEmployee = await Employees.create(req.body);
      res.status(201).json(newEmployee);
    }
  } catch(e) {
    // If unable to create employee, send status 400 with a message and the error
    res.status(400).json({
      message: "Employee could not be created",
      error: e
    });
  }
}

// Update
const updateEmployee = async (req, res) => {
  try {
    // Find one employee by id and update with req.body
    await Employees.findOneAndUpdate(
      {_id: req.body._id},
      req.body,
      // Return updated employee,
      // Run Mongoose validations on update query
      {new: true, runValidators: true}
    );
  } catch(e) {
    res.status(400)
    .json({
      message: "Failed to update employee",
      error: e
    });
  }
}

// Delete
const deleteEmployee = async (req, res) => {
  try {
    // Delete employee by id in URL
    const deletedEmployee = await Employees.deleteOne({_id: req.params.id})
    // Send status 200 ok && a message indicating
    // that the employee has been deleted successfully
    res.status(200)
    .json({
      message: `Employee ${deletedEmployee.firstName} 
      ${deletedEmployee.lastName} has been removed`
    });
  } catch(e) {
    res.status(400)
    .json({
      message: `Unable to delete employee`,
      error: e
    });
  }
}


module.exports = {
  getAllEmployees,
  getOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
}