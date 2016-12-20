const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'target')));

app.set('trust proxy', true);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  if (req.protocol !== 'https') {
    res.redirect(301, 'https://' + req.host + req.originalUrl);
  } else {
    res.sendFile(path.resolve(__dirname, '..', 'target', 'index.html'));
  }
});

module.exports = app;
