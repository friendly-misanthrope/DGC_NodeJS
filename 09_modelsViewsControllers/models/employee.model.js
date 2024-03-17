const mongoose = require('mongoose');

// ! Create custom validation functions and remove
// ! validation checks from the model to send correct
// ! response status.

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Employee first name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Employee last name is required"]
  }
}, {timestamps: true});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;