const Users = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    return res.status(403)
  }
  const refreshToken = cookies.jwt;
  console.log(refreshToken)
  try {
    // get user based on username
    const foundUser = await Users.findOne({username: "Nick"})
  } catch(e) {

  }
}

module.exports = { userRefreshToken };