const Users = require('../models/user.model');
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
  // get user and password from login form
  const { user, pwd } = req.body;

  // Check that both fields are present
  if (!user || !pwd) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    // Check if provided username exists in DB
    const foundUser = await Users.findOne({ username: user });
    // If user isn't found, return 401 unauthorized
    if (!foundUser) {
      return res.status(401).json({message: "Invalid credentials"});
    }
    // If passwords match, log user in
    const pwMatch = await bcrypt.compare(pwd, foundUser.password);
    if (pwMatch) {
      // JWT auth goes here
      res.json({message: `User ${foundUser.username} logged in successfully.`});
    } else {
      res.status(401).json({message: "Invalid credentials"});
    }
  } catch(e) {
    res.status(401).json({error: e});
  }
}

module.exports = { userLogin };