const { HttpStatus, HttpStatusCode, HttpStatusWithCode } = require('../utilities/HttpStatusCodes.cjs');
const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('Welcome to basic get request');
});
app.get('/greet', (req, res) =>{
    greetHandler(req,res);
});

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
    // Get all query string parameters
    const queryParams = req.query;
    let response = {};
    if(queryParams && queryParams.name) {
        response.message = "Hello, " + queryParams.name;
        response.statusCode = HttpStatus.OK;
    }else{
        response.message = "Hello, Guest";
        response.statusCode = HttpStatusWithCode.OK_200;
        response.statusCode = HttpStatusCode['200_OK'];
    }
    res.status(response.statusCode).send(response.message);
}

let port = 3000;
app.listen(port, ()=> {
    console.log("Node running on port: " + port);
});