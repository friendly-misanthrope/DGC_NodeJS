const Users = require('../models/user.model');

const userLogout = async (req, res) => {
  // ! On client, also delete accessToken from cookies
  // get cookies from request
  const cookies = req.cookies;
  // If no cookies or no JWT, rtn 204 successful, no content
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  // Create refresh token
  const refreshToken = cookies.jwt;

  try {
    // Is refreshToken in DB?
    // Decode refreshToken payload, save username
    const username = JSON.parse(atob(refreshToken.split('.')[1])).username;
    // Find user based on username in refresh token
    const foundUser = await Users.findOne({ username: username });
    // If username from refreshToken isn't found in DB, clear jwt cookie
    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    }
    
    // Delete refresh token from database
    const currentUser = { ...foundUser, refreshToken: ''};
    await Users.findOneAndUpdate(
      {username: username},
      { currentUser }
    );
    res.clearCookie('jwt', { httpOnly: true }) // add { secure: true } in prod
    .sendStatus(204) 
    // error handling
  } catch(e) {
    res.status(500).json({error: e});
  }
}

module.exports = { userLogout };