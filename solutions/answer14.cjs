const express = require('express');
const app = express();
const { cachingMiddleware } = require('../middlewares/cachingMiddleware.cjs');
const { HttpStatusWithCode } = require('../utilities/HttpStatusCodes.cjs');

app.get("/fetchData", cachingMiddleware, (req, res)=>{
    console.log("Data Fetched");
    res.status(HttpStatusWithCode.OK_200).send(req.cachedData);
});


const port = process.env.PORT || 3003;
app.listen(port, ()=>{
    console.log("Express server listening on the port: " + port);
});