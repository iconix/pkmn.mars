const fileExists = require('file-exists');
const nodeEnv = require('node-env-file');
const path = require('path');

exports.setup = function() {
    // Add env vars from .env to current process, if .env exists
    var envFile = '../.env';
    if (fileExists.sync(path.resolve(process.cwd(), envFile))) {
        nodeEnv(envFile);
    }

    // if Papertrail host or port are not defined, skip setup
    if (!process.env.WINSTON_PAPERTRAIL_HOST || !process.env.WINSTON_PAPERTRAIL_PORT) {
        return;
    }

    const winston = require('winston');

    //
    // Requiring `winston-papertrail` will expose
    // `winston.transports.Papertrail`
    //
    require('winston-papertrail').Papertrail;

    var winstonPapertrail = new winston.transports.Papertrail({
        flushOnClose: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        host: process.env.WINSTON_PAPERTRAIL_HOST,
        port: process.env.WINSTON_PAPERTRAIL_PORT,
        program: 'console'
    })

    winstonPapertrail.on('error', function(err) {
        // Handle, report, or silently ignore connection errors and failures
    });

    var logger = new winston.Logger({
        transports: [winstonPapertrail]
    });

    return logger;
}
