const { HttpStatus } = require('../utilities/HttpStatusCodes.cjs');
const requestCounts = {};
let getIpFromRequest = (req) => {
    let ips = (
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress || ''
    ).split(',');
    const ip = ips.length > 0 ? ips[0].trim() : '';
    return ip === '::1' ? '127.0.0.1' : ip;
};

function rateLimitMiddleware(req, res, next) {
    try {
        const rateLimit = 10; // Maximum number of requests allowed per minute
        const ip = getIpFromRequest(req); // Get the client's IP address
        
        // Get the current timestamp in milliseconds
        const currentTime = Date.now();        

        // Check if the IP address has made requests within the last minute
        if(!requestCounts[ip]){
            requestCounts[ip] = {
                timestamp: currentTime,
                count: 1
            };
        } else {
            const timestamp = requestCounts[ip].timestamp;
            // Calculate the time elapsed since the last request
            const elapsedTime = currentTime - timestamp;
            //We can either delete record or reset it if elapsed time > 1 min
            // Delete the record after 60 seconds
            setTimeout(() => {
                delete requestCounts[ip];
            }, 60000);
            //Increment count
            requestCounts[ip].count++;
            // Check if the count exceeds the rate limit
            if (requestCounts[ip].count > rateLimit) {
                return res.status(HttpStatus.TOO_MANY_REQUESTS).send(`Too Many Requests from ${ip}`);
            }
            
            /*
            // Reset the count if the time elapsed is greater than a minute
            if (elapsedTime > 60000) {
                requestCounts[ip] = {
                    timestamp: currentTime,
                    count: 1
                }     
            } else {
                //Increment count
                requestCounts[ip].count++;
                // Check if the count exceeds the rate limit
                if (requestCounts[ip].count > rateLimit) {
                    return res.status(HttpStatus.TOO_MANY_REQUESTS).send(`Too Many Requests from ${ip}`);
                }
            }
            */
        }
        req.customIP = ip;
        req.requestCounts = requestCounts[ip];
        next();
    } catch (error) {
        console.error('Error in rate limiting middleware:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
}
//We can also use express-rate-limiter instead of custom logic
module.exports = {
    rateLimit: rateLimitMiddleware
};