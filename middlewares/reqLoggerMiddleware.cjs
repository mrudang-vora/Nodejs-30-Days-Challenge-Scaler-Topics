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
    next();
}

function reqLoggerDetailed(req, res, next) {
    let timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let reqMethod = req.method;
    let url = req.originalUrl;
    let reqHeaders = req.headers;
    let reqBody = req.body;
    let ip = getIpFromRequest(req);
    console.log('Logging the request:'
                + "\n Timestamp: " + colors.yellow(timestamp) 
                + "\n Req Method: " + colors.green(reqMethod)
                + "\n Req URL: " + colors.magenta(url)
                + "\n Req Headers: " + colors.blue(reqHeaders)
                + "\n Req Body: " + colors.white(reqBody)
                + "\n IP: " + colors.red(ip)
                );
    next();
}

module.exports = {
    requestLogger : requestLoggerMiddleware
    ,reqLoggerDetailed: reqLoggerDetailed
};
