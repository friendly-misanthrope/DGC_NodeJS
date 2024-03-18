const Users = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const verify = require('../middleware/verifyJWT');
require('dotenv').config();

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
      const accessToken = jwt.sign(
        // Payload - no sensitive data
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2m' }
      );
      const refreshToken = jwt.sign(
        // Payload - no sensitive data
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      const currentUser = { ...foundUser, refreshToken };
      await Users.findOneAndUpdate(
        { username: foundUser.username },
        { currentUser },
        { runValidators: true }
      );

      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 });
      res.json({ accessToken });
    } else {
      res.status(401).json({message: "Invalid credentials"});
    }
  } catch(e) {
    res.status(401).json({error: e});
  }
}

module.exports = { userLogin };