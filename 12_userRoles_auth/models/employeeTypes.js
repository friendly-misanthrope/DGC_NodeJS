const mongoose = require('mongoose');

const EmployeeTypesSchema = new mongoose.Schema({
  
  empRoles: {
    type: Array,
    default: [
      // ToDo: require presence of empType && empCode to add custom employee type
      { empType: "Employee", empCode: 1984 },
      { empType: "Manager", empCode: 4200 },
      { empType: "Owner", empCode: 6900 }
    ]
  }
}, {timestamps: true});

module.exports = mongoose.model('employee', EmployeeTypesSchema);