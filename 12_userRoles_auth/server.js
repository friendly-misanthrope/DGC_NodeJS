/* IMPORTS */
const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const { verifyJWT } = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

// Instantiate app
const app = express();
// Connect to MongoDB
require('./config/mongoose.config');


/* CUSTOM MIDDLEWARE */
// Event logger
app.use(logger);
// Custom error handling
app.use(errorHandler);


/* THIRD-PARTY MIDDLEWARE */
app.use(cookieParser());
// CORS policy
app.use(cors(corsOptions));
// body-parser
app.use(bodyParser.urlencoded({extended: true}));


/* BUILT-IN EXPRESS MIDDLEWARE */
// Allows form data to be handled via URL
app.use(express.urlencoded({ extended: false }));
// Allows handling of JSON data
app.use(express.json());
// Allow serving of static files to:
// root dir
app.use(express.static(path.join(__dirname, '/public')));


/* ROUTES */
// index
app.use('/', require('./routes/root'));
// register
app.use('/register', require('./routes/register'));
// Login
app.use('/auth', require('./routes/auth'));
// Refresh Token
app.use('/refresh', require('./routes/refresh'));
// Logout
app.use('/logout', require('./routes/logout'));
// Forgot Password
app.use('/forgotPassword', require('./routes/forgotPassword'));
// Reset Password
app.use('/resetPassword', require('./routes/resetPassword'));

/* PROTECTED ROUTES */
// employees
app.use('/employees', verifyJWT, require('./routes/api/employeesAPI.route'));
// users with Employees
app.use('/users', verifyJWT, require('./routes/api/usersAPI.route'));


/* 404  */
app.all('/*', (req, res) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  }
  else if (req.accepts('json')) {
    res.status(404).json({error: "404 Not Found"});
  } else {
    res.status(404).type('txt').send("404 Not Found");
  }
});


// Listen for incoming requests on specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});