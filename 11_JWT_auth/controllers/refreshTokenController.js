const Users = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRefreshToken = async (req, res) => {
  // get cookies from request
  const cookies = req.cookies;
  // If no cookies or no JWT, rtn 401 unauthorized
  if (!cookies?.jwt) {
    return res.status(401);
  }
  
  // Create refresh token
  const refreshToken = cookies.jwt;

  try {
    // Find user based on username from req.cookies.jwt
    const foundUser = await Users.findOne({ username: refreshToken.username });
    // If username from refreshToken isn't found in DB, rtn 401 unauthorized
    if (!foundUser) {
      return res.status(401);
    }
    // Verify refresh token with private key
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        // if access token not valid
        if (err || foundUser.username !== decoded.username) {
          // rtn 403 forbidden
          return res.sendStatus(403);
        }
        // otherwise, sign a new access token
        const accessToken = jwt.sign(
          { "username": decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '5m' }
        );
        // send new access token in response
        res.json({ accessToken });
      }
    )
    // error handling
  } catch(e) {
    res.status(401).json({error: e});
  }
}

module.exports = { userRefreshToken };