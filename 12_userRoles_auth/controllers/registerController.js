const Employees = require('../models/employees.model');
const Users = require('../models/users.model');


const registerUser = async (req, res) => {
  try {
    // Check if user attempting to be created already exists
    const potentialUser = await Users.findOne({
      username: req.body.username
    })
    // if username exists in DB,
    if (potentialUser) {
      // Return 409 conflict && an error message
      return res.status(409).json({message: `${potentialUser.username} already exists.`});
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
        })
      });
      // If user and employee were created successfully,
      // return 201 created && send new user object in response
      res.status(201).json({message: `${newUser.username} added to system`, user: newUser});
    }
  } catch (err) {
    res.status(400).json({message: `Could not add ${req.body.username}`, err});
  }
}


module.exports = { registerUser };