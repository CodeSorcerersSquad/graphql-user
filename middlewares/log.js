const winston = require('winston');
const expressWinston = require('express-winston');

// Creating middleware
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
const wistonMiddleware = expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting, with the same colors.
    colorStatus: true, // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
    ignoreRoute: function (req, res) {
        return false;
    } // optional: allows to skip some log messages based on request and/or response
});

/**
 * Custom Wiston Express Middleware to log all requests and responses in the console.
 */
module.exports = wistonMiddleware;
