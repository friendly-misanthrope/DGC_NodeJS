const Users = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
      // create access token
      const accessToken = jwt.sign(
        // Payload - no sensitive data
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
      );
      // create refresh token
      const refreshToken = jwt.sign(
        // Payload - no sensitive data
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      // Update user in DB to include refreshToken
      const currentUser = { ...foundUser, refreshToken };
      await Users.findOneAndUpdate(
        { username: foundUser.username },
        { currentUser },
        { runValidators: true }
      );
      // Send http-only cookie with JWT
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',  secure: true, maxAge: 24*60*60*1000 });
      // Send access token
      res.json({ accessToken });
    } else {
      res.status(401).json({message: "Invalid credentials"});
    }
    // error handling
  } catch(e) {
    res.status(500).json({error: e});
  }
}

module.exports = { userLogin };