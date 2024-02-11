const { HttpStatus, HttpStatusCode, HttpStatusWithCode } = require('../utilities/HttpStatusCodes.cjs');
const path = require('path');
const express = require('express');
const app = express();

//Use Middleware to serve the static files - 1 line solution
//app.use(express.static(path.join(__dirname, '../public'),{index: 'index.html'}));

//With use of static module of express as middleware for serving static files
//Default path served in case nothing is given is public/index.html
const customDirPath = path.join(__dirname, '../public');
app.use(express.static(customDirPath));
function staticFileServer(req, res){
    res.sendFile(path.join(customDirPath,'index.html'));
}
app.get('/', staticFileServer);

/*
//Without use of static module of express
function staticFileServerWithoutStatic(req, res) {
    let filePath = req.params.path || "index.html";
    let completeFilePath = path.resolve(__dirname, '../public', filePath);
    res.sendFile(completeFilePath);
}
app.get('/:path(*)', staticFileServerWithoutStatic);
*/

let port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log('listening on port: ' + port);
});