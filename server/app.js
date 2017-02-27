const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Compress all requests
app.use(compression());

// Setup logger
app.use(morgan('combined'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'target')));

app.set('trust proxy', true);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(301, 'https://' + req.host + req.originalUrl);
  } else {
    res.sendFile(path.resolve(__dirname, '..', 'target', 'index.html'));
  }
});

module.exports = app;
