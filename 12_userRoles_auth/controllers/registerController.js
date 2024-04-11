const Employees = require('../models/employees.model');
const Users = require('../models/users.model');

// Register user with new employee by default
const registerUser = async (req, res) => {
  try {
    // Check if user attempting to be created already exists
    const potentialUser = await Users.findOne({
      email: req.body.email
    })
    // if email exists in DB,
    if (potentialUser) {
      // Return 409 conflict && an error message
      return res.status(409).json({ message: `${potentialUser.email} already exists.` });
    } else {
      // otherwise, create new user from req.body
      const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName } = req.body;

      const newUser = await Users.create({
        email,
        password,
        confirmPassword,
        // and assign it a new Employee instance
        employee: await Employees.create({
          firstName,
          lastName
        })
      });
      // If user and employee were created successfully,
      // return 201 created && send new user object in response
      // ToDo: remove user (at least password field) from success response
      res.status(201).json({ message: `${newUser.email} added to system`, newUser });
    }
  } catch (err) {
    res.status(400).json({ message: `Could not add ${email}`, err });
  }
}


module.exports = { registerUser };