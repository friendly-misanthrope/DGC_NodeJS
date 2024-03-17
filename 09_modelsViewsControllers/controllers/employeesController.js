// retrieve employees from 'database'
const data = {}
data.employees = require('../models/employees.json');

const getAllEmployees = (req, res) => {
  res.json(data.employees);
}

const createEmployee = (req, res) => {
  res.json({
    "firstName": req.body.firstName,
    "lastName": req.body.lastName
  });
}

const updateEmployee = (req, res) => {
  res.json(
    {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName
    });
}

const deleteEmployee = (req, res) => {
  res.json({ "id": req.body.id });
}

const getOneEmployee = (req, res) => {
  res.json({"id": req.params.id});
}


module.exports = { 
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee
}