const Employees = require('../models/employees.model');
const Users = require('../models/users.model');

// Register user with new employee
const registerUser = async (req, res) => {
  try {
    // Check if user attempting to be created already exists
    const potentialUser = await Users.findOne({
      username: req.body.username
    })
    // if username exists in DB,
    if (potentialUser) {
      // Return 409 conflict && an error message
      return res.status(409).json({ message: `${potentialUser.username} already exists.` });
    } else {
      const {
        username,
        password,
        confirmPassword,
        firstName,
        lastName } = req.body;
      // otherwise, create new user from req.body
      const newUser = await Users.create({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        // and assign it a new Employee instance
        employee: await Employees.create({
          firstName: firstName,
          lastName: lastName
          // userId: newUser._id
        })
      });
      // update user.employee.userId to newUser's _id
      // const createdUser = await Users.findOneAndUpdate(
      //   {_id: newUser._id},
      //   // set user.employee.userId to newUser's _id
      //   { employee: {
      //     userId: newUser._id
      //   } },
      //   { new: true}
      // )

      // If user and employee were created successfully,
      // return 201 created && send new user object in response
      // ToDo: remove user (at least password field) from success response
      res.status(201).json({ message: `${createdUser.username} added to system`, user: createdUser });
    }
  } catch (err) {
    res.status(400).json({ message: `Could not add ${req.body.username}`, err });
  }
}


module.exports = { registerUser };