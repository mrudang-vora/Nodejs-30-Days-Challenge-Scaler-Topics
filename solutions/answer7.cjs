const { HttpStatus, HttpStatusCode, HttpStatusWithCode } = require('../utilities/HttpStatusCodes.cjs');
const express = require('express');
const app =  express();
const reqLoggerMiddleware = require('../middlewares/reqLoggerMiddleware.cjs');
app.use(reqLoggerMiddleware.requestLogger);

app.get("/", (req, res) =>{
    res.status(HttpStatus.OK).send("Welcome to GET method");
});

let port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("listening on port: " + port);
});