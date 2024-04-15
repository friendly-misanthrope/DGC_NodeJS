const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');
require('dotenv').config();

const resetPassword = (req, res) => {

}

module.exports = { resetPassword }