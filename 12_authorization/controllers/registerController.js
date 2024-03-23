const Employees = require('./employeesController');
const Users = require('../models/user.model');


const registerUser = async (req, res) => {
  try {
    const potentialUser = await Users.findOne({
      username: req.body.username
    })
    if (potentialUser) {
      return res.status(409).json({message: `${potentialUser.username} already exists.`});
    } else {
      const newUser = await Users.create(req.body);
      res.status(201).json({message: `${newUser.username} added to system`, user: newUser});
    }
  } catch (err) {
    res.status(400).json({message: `Could not add ${req.body.username}`, err});
  }
}

module.exports = { registerUser };