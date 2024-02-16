const express = require('express');
const app = express();
const { reqLoggerDetailed } = require('../middlewares/reqLoggerMiddleware.cjs');
const { HttpStatusWithCode } = require('../utilities/HttpStatusCodes.cjs');
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(reqLoggerDetailed);

app.get("/", (req, res) => {
    console.log("Welcome to challenge 15 - GET")
});

app.get("/fetchData", (req, res)=>{
    console.log("Data Fetched");
    res.status(HttpStatusWithCode.OK_200).send(req.url);
});

app.post("/postData", (req, res)=>{
    console.log("Data Posted");
    res.status(HttpStatusWithCode.OK_200).send(req.url);
});

const port = process.env.PORT || 3003;
app.listen(port, ()=>{
    console.log("Express server listening on the port: " + port);
});