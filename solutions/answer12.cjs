const { HttpStatus, HttpStatusCode, HttpStatusWithCode } = require('../utilities/HttpStatusCodes.cjs');
const express = require('express');
const dotenv = require('dotenv').config();
const limiter = require('../middlewares/rateLimiter.cjs');
const app = express();
app.use(express.json());

app.get("/", (req, res) =>{
    let objResponse = {
        application: 'Scaler30DayChallenge'
        , message: "Default Get Request"
    }; 
    res.status(HttpStatus.OK).send(objResponse);
});

app.get("/getWithLimit", limiter.rateLimit, (req, res) =>{
    let objResponse = {
        application: 'Scaler30DayChallenge'
        , message: "Good Requests"
        , ip: req.customIP
        , count: req.requestCounts.count
    }; 
    res.status(HttpStatus.OK).send(objResponse);
});

let port = process.env.PORT;
app.listen(port, () => {
    console.log('listening on port: ' + port);
});