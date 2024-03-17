const mongoose = require('mongoose');

// Use validator to sanitize user input data

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Employee first name is required"],
    minLength: [3, "First name must be at least 3 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Employee last name is required"]
  }
}, {timestamps: true});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;