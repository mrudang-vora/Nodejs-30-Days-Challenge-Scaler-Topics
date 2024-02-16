const { HttpStatus, HttpStatusCode, HttpStatusWithCode } = require('../utilities/HttpStatusCodes.cjs');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
app.use(express.json());
const jwtSecret = process.env.JWT_SECRET || 'shh...its secret';

function authenticationMiddleware(req, res, next) {
    const jwtSecret = process.env.JWT_SECRET || 'shh...its secret';
    const authToken = req.headers.authorization;
    let objResponse = {
        isAuthenticated: false,
        application: 'Scaler30DayChallenge',
        message: 'Token is required'
    };
    if(!authToken){
        return res.status(HttpStatus.UNAUTHORIZED).send(objResponse);
    }
    jwt.verify(authToken,  jwtSecret, (err, decodedReq) => {
        if(err){
            objResponse.message = 'Token is incorrect';
            return res.status(HttpStatus.UNAUTHORIZED).send(objResponse);
        }
        req.decodedRequest = decodedReq;
        next();
    });
}

app.get('/', (req, res) =>{
    let objResponse = {
        application: 'Scaler30DayChallenge'
        , message: "Challenge 11 - JWT Get Request"
    };
    res.status(HttpStatus.OK).send(objResponse);
});

app.get('/generateToken', (req, res) =>{
    const queryParams = req.query;
    let vendorId = queryParams?.vendorId;
    let objResponse = {
        application: 'Scaler30DayChallenge'
        , authToken: ''
        , message: "Successfully generated token"
    };
    if(vendorId){
        const payload = {vendorId};
        let token = jwt.sign(payload, jwtSecret, {expiresIn: '1h'});
        objResponse.authToken = token;
        res.status(HttpStatus.OK).send(objResponse);
    }else{
        objResponse.message = "No payload found for generating token";
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(objResponse);
    }
});

app.get('/authenticated', authenticationMiddleware, (req, res) =>{
    let objResponse = {
        application: 'Scaler30DayChallenge'
        , decodedRequest: req.decodedRequest
        , message: 'Authentication successful'
    };
    res.status(HttpStatus.OK).send(objResponse);
});
let port = process.env.PORT;
app.listen(port, () => {
    console.log('listening on port: ' + port);
});