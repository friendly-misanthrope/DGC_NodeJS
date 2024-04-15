const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const resetPassword = async (req, res) => {
  const { id, resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ err: "Passwords do not match" });
  }

  try {
    const user = await Users.findOne({ _id: id });
    jwt.verify(resetToken, process.env.RESET_PASSWORD_SECRET,
      async (err, decoded) => {
        if (err || user.email !== decoded.email) {
          return res.status(403).json({ message: "Token invalid", err })
        }
        await Users.findOneAndUpdate({ _id: id },
          { password: await bcrypt.hash(password, 12) },
          { validators: true }
        );
        res.status(201).json({ message: "Password changed successfully", decoded });
      }
    );
  } catch (e) {
    res.status(400).json({ message: "Unable to change password" }, e);
  }
}

// ToDo: Optimize validations, disallow resetting the same password
// ToDo: Consider keeping an array of recent passwords in DB

module.exports = { resetPassword }