const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mailer = require('nodemailer');
require('dotenv').config();

const forgotPassword = async (req, res) => {
  
}

module.exports = {
  forgotPassword
}