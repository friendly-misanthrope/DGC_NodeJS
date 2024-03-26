const mongoose = require('mongoose');

const EmployeeTypesSchema = new mongoose.Schema({
  
  empRoles: {
    type: Array,
    default: [
      // ToDo in Controller: require presence of empType && empCode to add custom employee type
      // ToDo in controller: santize input data - empType should be string and empCode should be number
      { empType: "Employee", empCode: 1984 },
      { empType: "Manager", empCode: 4200 },
      { empType: "Owner", empCode: 6900 }
    ]
  }
}, {timestamps: true});

module.exports = mongoose.model('employeeType', EmployeeTypesSchema);