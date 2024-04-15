const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();

const resetPassword = async (req, res) => {
  const { id, resetToken } = req.params;
  const { password, confirmPassword } = req.body;
  jwt.verify(resetToken, process.env.RESET_PASSWORD_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token invalid", err })
      }
      else {
        const pw = await bcrypt.hash(password, 12);
        await Users.findOneAndUpdate({ _id: id }, { password: pw }, { validators: true, new: true })
        res.status(201).json({message: "Password changed successfully"})
      }
    }
  );
}

module.exports = { resetPassword }