// Import Mongoose Model
const EmployeeTypes = require('../models/employeeTypes.model');

const getAllEmployeeTypes = (req, res) => {
  EmployeeTypes.find()
    .then((allEmployeeTypes) => {
      res.json(allEmployeeTypes);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Unable to get all employee types",
        error: err
      })
    });
};

module.exports = {
  getAllEmployeeTypes
};