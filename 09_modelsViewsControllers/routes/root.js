const express = require('express');
const router = express.Router();
const path = require('path');

// Routers & handlers for root route
router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'new-page.html'));
});

//! Sending 304 instead of 301 when redirects - why?
router.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page');
});

module.exports = router;