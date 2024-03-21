const Users = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRefreshToken = async (req, res) => {
  // get user and password from login form
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401);
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  try {
    // Check if provided username exists in DB
    const foundUser = await Users.findOne({ username: user });
    // If user isn't found, return 401 unauthorized
    if (!foundUser) {
      return res.status(403).json({message: "Invalid credentials"});
    }
    // Verify refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        // if access token not valid
        if (err || foundUser.username !== decoded.username) {
          return res.sendStatus(403);
        }
        // otherwise, create new access token
        const accessToken = jwt.sign(
          { "username": decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '5m' }
        );
        // send token in response
        res.json({ accessToken });
      }
    )
    // error handling
  } catch(e) {
    res.status(401).json({error: e});
  }
}

module.exports = { userRefreshToken };