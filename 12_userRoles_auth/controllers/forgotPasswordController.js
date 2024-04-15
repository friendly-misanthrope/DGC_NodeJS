const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');
require('dotenv').config();

const forgotPassword = async (req, res) => {
  
    // Get user based on email
    const { email } = req.body;
    const user = await Users.findOne({ email: email });
    // If no user in DB, return status 400 & error message
    if (!user) {
      return res.status(400).json({ message: `No user with email ${email} found` });
    }
    // Otherwise, generate a JWT reset token with email
    const resetToken = jwt.sign(
      { "email": user.email },
      process.env.RESET_PASSWORD_SECRET + user.password,
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

    transporter.sendMail({
      from: process.env.GOOGLE_APP_EMAIL,
      to: email,
      subject: 'ERPeezy Password Reset',
      text: `Reset Link: ${process.env.CLIENT_URL}/resetPassword/${user._id}/${resetToken}`
    })

    await Users.updateOne({ resetLink: resetToken })

  
    res.status(200).json({ message: `Forgot Password link sent` })
}

module.exports = {
  forgotPassword
}