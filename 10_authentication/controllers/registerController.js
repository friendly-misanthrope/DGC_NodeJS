const Employees = require('./employeesController');
const Users = require('../models/user.model');

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
  // ToDo: 
  // get username and password from form
  // check for duplicate usernames in DB
  try {
    const potentialUser = await Users.findOne({
      username: req.body.username
    })
    if (potentialUser) {
      return res.status(409).json({message: `${potentialUser.username} already exists.`});
    } else {
      // encrypt password (in user.model middleware)
      const newUser = await Users.create(req.body);
      res.status(201).json({message: `${newUser.username} added to system`});
    }
  } catch (e) {
    res.status(500).json({message: `Could not add ${req.body.username}`, error: e});
  }
}