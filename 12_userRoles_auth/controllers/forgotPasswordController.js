const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mailer = require('nodemailer');
require('dotenv').config();

const forgotPassword = async (req, res) => {
  try {
    // Get user based on email
    const { email } = req.body;
    const user = await Users.findOne({ email: email });
    // If no user in DB, return status 400 & error message
    if (!user) {
      return res.status(400).json({ message: `No user with email ${email} found` });
    }
    // Otherwise, generate a JWT reset token
    const resetToken = jwt.sign(
      { "email": user.email },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: '15min' }
    );

    let transporter = mailer.createTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PW
      }
    });

    const emailOptions = {
      from: process.env.GOOGLE_APP_EMAIL,
      to: email,
      subject: 'ERPeezy Password Reset'
    }

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