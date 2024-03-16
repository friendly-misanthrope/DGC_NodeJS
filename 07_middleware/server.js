const express = require('express');
const path = require('path');
const logEvents = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;
const app = express();

// Custom middleware (logger)
// Waterfall cascades to each route below middleware
app.use((req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
});

// Built-in middleware
// allows form data to be handled via URL
app.use(express.urlencoded({ extended: false }));

// allows handling of JSON data
app.use(express.json());

// allow serving of static files
app.use(express.static(path.join(__dirname, 'public')));

// HTTP routes & handlers
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
})

app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Listen for HTTP requests on specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});