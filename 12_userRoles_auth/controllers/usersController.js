const Users = require('../models/users.model');
const Employees = require('../models/employees.model');

// Get All
const getAllUsersWithEmployee = async (req, res) => {
  try {
    const users = await Users.find();
    const allUsersWithEmployee = await Promise.all(users.map(async (user) => {
      // Get employee for current user
      const employeeObj = await Employees.findOne({ _id: user.employee });
      user.employee = employeeObj;
      return user;
    }));

    res.status(200).json(allUsersWithEmployee)
  } catch (e) {
    res.status(500).json({ message: "Unable to get all users with their employee" })
  }
}



// Export functions
module.exports = {
  getAllUsersWithEmployee
}