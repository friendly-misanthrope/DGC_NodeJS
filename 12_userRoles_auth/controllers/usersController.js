const Users = require('../models/users.model');
const Employees = require('../models/employees.model');

// Get All
const getAllUsersWithEmployee = async (req, res) => {
  try {
    const users = await Users.find();
    const allUsers = users.map(async (user) => {
      // Get employee for current user
      // const employeeId = user.employee;
      const employeeObj = await Employees.findOne({ _id: user.employee })
      console.log(employeeObj)

    })
  } catch (e) {
    res.status(500).json({ message: "Unable to get all users with their employee" })
  }

}



// Export functions
module.exports = {
  getAllUsersWithEmployee
}