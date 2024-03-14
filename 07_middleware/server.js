const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3500;

const app = express();

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
  console.log('attempted to load hello.html');
})

app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Listen for HTTP requests on specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});