const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mailer = require('nodemailer');
require('dotenv').config();

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const potentialUser = await Users.findOne({ email });
    const resetToken = jwt.sign(
      { "email": potentialUser.email },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: '5m' }
    );

    let transporter = mailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        email: process.env.GOOGLE_APP_EMAIL,
        pwd: process.env.GOOGLE_APP_PW
      }
    });

    const data = {
      from: "noreply.erpeezy@gmail.com",
      to: email,
      subject: "ERPeezy Password Reset",
      html: `
      <h3>Follow the link below to reset your password</h3>
      <p>${process.env.CLIENT_URL}/resetpassword/${resetToken}</p>`
    }

    await potentialUser.updateOne(
      {resetLink: resetToken},
      {new: true}
    );

    transporter.sendMail(data, (error, body) => {
      if (error) {
        return res.status(400).json({error: error.message})
      }
      return res.status(200).json({message: "Reset link has been sent. Please check your email."})
    })
    
  } catch (e) {
    res.status(400).json({error: "Unable to send reset link"})
  }
}

module.exports = {
  resetPassword
}