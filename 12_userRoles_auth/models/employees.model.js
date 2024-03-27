const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeesSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [2, "First name must be at least 2 characters"],
    maxLength: [32, "First name must be 32 characters or less"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [2, "Last name must be at least 2 characters"],
    maxLength: [32, "Last name must be between 2 and 32 characters"]
  },
  userRoles: {
    type: Array,
    default: [
      { empType: "Employee", empCode: 1984 }
    ]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeesSchema);