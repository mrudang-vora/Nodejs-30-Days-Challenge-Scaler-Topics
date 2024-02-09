const { HttpStatus, HttpStatusCode, HttpStatusWithCode } = require('../utilities/HttpStatusCodes.cjs');

function negativeIntegerHandler(req, res, next) {
    let queryParams = req.query;
    let response = {
        success: 0
        , message: 'Error:- '
    }
    let number = parseInt(queryParams?.number);
    if(Number.isInteger(number) && number < 0) {
        response.message += ` Number ${number} is not a positive number.`;
        res.status(HttpStatus.BAD_REQUEST).send(response);
    }else if(isNaN(number)) {
        response.message += ` No number provided.`;
        res.status(HttpStatus.BAD_REQUEST).send(response);
    }
    next();
}


module.exports = {
    negativeIntegerHandler
};