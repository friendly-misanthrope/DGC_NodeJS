/* IMPORTS */
const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
require('./config/mongoose.config');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500;
const app = express();

/* CUSTOM MIDDLEWARE */
// Event logger
app.use(logger);


/* THIRD-PARTY MIDDLEWARE */
// CORS policy
app.use(cors(corsOptions));


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
// employees
app.use('/employees', require('./routes/api/employees'));


// Custom 404 behavior
app.all('/*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  }
  else if (req.accepts('json')) {
    res.json({error: "404 Not Found"});
  } else {
    res.type('txt').send("404 Not Found");
  }
});

// Custom error handling
app.use(errorHandler);

// Listen for incoming requests on specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});