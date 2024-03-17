/* IMPORTS */
const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const app = express();

/* CUSTOM MIDDLEWARE */
// Event logger
app.use(logger);


/* THIRD-PARTY MIDDLEWARE */
// CORS whitelist
const allowedDomains = ['http://www.mywebsite.com'];

// CORS policy
const corsOptions = {
  origin: (reqOrigin, cb) => {
    //TODO: Remove '!reqOrigin' check before deploying
    !reqOrigin || allowedDomains.indexOf(reqOrigin) !== -1 ?
      cb(null, true)
      : cb(new Error("CORS policy has blocked this request"));
  },

  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


/* BUILT-IN EXPRESS MIDDLEWARE */
// Allows form data to be handled via URL
app.use(express.urlencoded({ extended: false }));

// Allows handling of JSON data
app.use(express.json());

// Allow serving of static files to:
// root dir
app.use(express.static(path.join(__dirname, '/public')));
// subdir
app.use('/subdir', express.static(path.join(__dirname, '/public')));

/* ROUTERS */
// index
app.use('/', require('./routes/root'));
// subdir
app.use('/subdir', require('./routes/subdir'));




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


/* LISTEN FOR INCOMING REQUESTS ON SPECIFIED PORT */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});