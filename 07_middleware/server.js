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
    !reqOrigin || allowedDomains.indexOf(reqOrigin) !== -1 ?
      cb(null, true)
      : cb(new Error("CORS policy has blocked this request"));
  },

  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


/* BUILT-IN EXPRESS MIDDLEWARE */
// allows form data to be handled via URL
app.use(express.urlencoded({ extended: false }));

// allows handling of JSON data
app.use(express.json());

// allow serving of static files
app.use(express.static(path.join(__dirname, 'public')));


/* HTTP ROUTES AND HANDLERS */
app.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

//! Sending 304 instead of 301 when redirects - why?
app.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page');
});

app.get('/hello(.html)?', (req, res, next) => {
  res.send("Hello, this is the hello page!");
  console.log('attempted to load hello.html');
});

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