const colors = require('colors');
const dayjs = require('dayjs');

let getIpFromRequest = (req) => {
    let ips = (
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress || ''
    ).split(',');
    return ips[0].trim();
};


/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function requestLoggerMiddleware(req, res, next) {
    let timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let reqMethod = req.method;
    console.log(`${colors.yellow(timestamp)} - ${colors.blue(reqMethod)} request received.`);
    /*
    console.log('Logging the request:'
                + "\n Timestamp: " + colors.yellow(timestamp) 
                + "\n Req Method: " + colors.blue(reqMethod)
                + "\n IP: " + colors.magenta(getIpFromRequest(req)));
    */
    next();
}

module.exports = {
    requestLogger : requestLoggerMiddleware
};
