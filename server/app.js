const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const winstonLogger = require('./winston').setup();

// Handle form data
app.use(bodyParser.urlencoded({ limit: '50mb', type: 'application/x-www-form-urlencoded', extended: false }));

// Compress all requests
app.use(compression());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'target')));

app.set('trust proxy', true);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(301, 'https://' + req.hostname + req.originalUrl);
  } else {
    res.sendFile(path.resolve(__dirname, '..', 'target', 'index.html'));
  }
});

app.post('/log', (req, res) => {
  if (winstonLogger) {
    var console_logs = req.body; // TODO: check form data format

    Object.keys(console_logs).forEach((k) => {
      var log_object = JSON.parse(console_logs[k]);
      var level = (log_object.level).toLowerCase();
      delete log_object.level;

      winstonLogger.log(level, JSON.stringify(log_object));
    });

    res.sendStatus(200);
  } else {
    res.sendStatus(202);
  }
});

module.exports = app;
