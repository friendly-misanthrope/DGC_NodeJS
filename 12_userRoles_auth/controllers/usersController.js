const Users = require('../models/users.model');
const Employees = require('../models/employees.model');

// Get All
const getAllUsersWithEmployee = async (req, res) => {
  try {
    // Query DB for users
    const users = await Users.find();
    // If no users in DB, return 200 ok with a message stating that nothing was found
    if (users.length < 1) {
      return res.status(200).json({ message: "There are no users in the DB" })
    }
    const allUsersWithEmployee = await Promise.all(users.map(async (user) => {
      // Get employee object for current user
      const employeeObj = await Employees.findOne({ _id: user.employee });
      // set employee field in current user object to it's related employee
      user.employee = employeeObj;
      return user;
    }));
    // Send status 200 ok with all users and their employees
    res.status(200).json(allUsersWithEmployee)
  } catch (e) {
    res.status(500).json({ message: "Unable to get all users with their employee" })
  }
}



// Export functions
module.exports = {
  getAllUsersWithEmployee
}