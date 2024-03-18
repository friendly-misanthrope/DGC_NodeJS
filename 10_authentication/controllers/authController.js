const Users = require('../models/user.model');
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
  // get user and password from login form
  const { user, password } = req.body;

  // Check that both fields are present
  if (!user || ! password) {
    return res.status(400).json({message: 'Username and password are required'});
  }
  const foundUser = Users.find((u) => u.username === user);
  if (!foundUser) {
    return res.sendStatus(401);
  }

  // evaluate password
  const pwMatch = await bcrypt.compare(password, foundUser.password);
  if (pwMatch) {
    // ToDo: Create JWT to use with protected API routes
    res.json({message: `${foundUser} is now logged in.`})
  } else {
    res.sendStatus(401);
  }
}

module.exports = { userLogin }