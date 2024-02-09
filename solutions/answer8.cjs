const { HttpStatus, HttpStatusCode, HttpStatusWithCode } = require('../utilities/HttpStatusCodes.cjs');
const errorHandlerMW = require('../middlewares/errorHandler.cjs');
const express = require('express');

const app = express();
app.use(express.json());

/**
 * Express route to handle requests with a positive integer parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function positiveIntegerHandler(req, res) {
    // Get all query string parameters
    const queryParams = req.query;
    let response = {
        success: 1
        , message: 'Success:- We got a positive integer'
    }
    if(queryParams?.number && parseInt(queryParams?.number) >= 0) {
        response.message += `: ${queryParams.number}`;
        res.status(HttpStatus.OK).send(response);
    }else{
        throw new Error("Invalid Input");
    }
}

//Routes
app.get('/', (req, res)=>{
    res.status(HttpStatus.OK).send("Hello from the part 8");
});
app.get('/positive', errorHandlerMW.negativeIntegerHandler, positiveIntegerHandler);

let port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log("listening on port: " + port);
});