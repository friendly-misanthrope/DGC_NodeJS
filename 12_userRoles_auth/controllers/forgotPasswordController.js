const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mailer = require('nodemailer');
require('dotenv').config();

const forgotPassword = async (req, res) => {

  try {
    const { email } = req.body;
    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: `No user with email ${email} found` });
    }

    const resetToken = jwt.sign(
      { "email": user.email },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: '15min' }
    );

    // let transporter = mailer.createTransport()

    await Users.updateOne({ resetLink: resetToken })

    const decodedToken = JSON.parse(atob(resetToken.split('.')[1]))
    res.status(200).json(decodedToken)
  } catch (e) {
    res.status(400).json({ message: `Unable to send password reset email to ${email}` })
  }

}

module.exports = {
  forgotPassword
}