const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const app = express();


/* CUSTOM MIDDLEWARE */
// Event logger
app.use(logger);


/* THIRD-PARTY MIDDLEWARE */
// CORS whitelist
const allowedDomains = ['http://localhost:3500', 'https://localhost:3500', 'https://127.0.0.1:3500', 'http://127.0.0.1:3500'];

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

app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


/* LISTEN FOR INCOMING REQUESTS ON SPECIFIED PORT */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});