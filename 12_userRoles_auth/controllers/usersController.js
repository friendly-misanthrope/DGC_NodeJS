const Users = require('../models/users.model');
const Employees = require('../models/employees.model');
const bcrypt = require('bcrypt');

// Get All Users with their respective Employee instance
const getAllUsersWithEmployee = async (req, res) => {
  try {
    // Query DB for users
    const users = await Users.find();
    // Map over all users
    const allUsersWithEmployee = await Promise.all(users.map(async (user) => {
      // Get employee object for current user
      const employeeObj = await Employees.findOne({ _id: user.employee });
      // set employee field in current user object to it's related employee
      user.employee = employeeObj;
      return user;
    }));
    // Send status 200 ok with all users and their employees
    res.status(200).json(allUsersWithEmployee);
  } catch (e) {
    res.status(500).json({ message: "Unable to get all users with their employee" });
  }
}

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    res.status(200).json(await Users.find());
  } catch (e) {
    res.status(500).json({ message: "Unable to get all users", e });
  }

}

// Get One User by id
const getOneUser = async (req, res) => {
  try {
    // ToDo: Validate that id in URL is a valid ObjectId
    const potentialUser = await Users.findOne({ _id: req.params.id });
    if (!potentialUser) {
      return res.status(404).json({ message: `No user with id ${req.params.id} found` });
    }
    res.status(200).json(potentialUser);
  } catch (e) {
    res.status(400).json({ message: "Unable to find user", e });
  }
}

// // ToDo: Update a User by id (CHANGE PASSWORD)
// const updateUser = async (req, res) => {
//   // Get current user by id
//   // ToDo: Re-authenticate password before visiting pwChange route
//   try {
//     const potentialUser = await Users.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         password: await bcrypt.hash(req.body.password, 12)
//       }
//     );

//   } catch (e) {
//     res.status(400).json({ message: `Unable to update user ${potentialUser.username}` });
//   }
// }






// Export functions
module.exports = {
  getAllUsers,
  getAllUsersWithEmployee,
  getOneUser
}