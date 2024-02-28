require("dotenv").config();
const path = require("path");
const express = require("express");
const http = require("http");
const wsSetup = require("../utilities/SetupWebSocket.cjs").setupWebSocket;

//Create express app
const app = express();

//Create express server using Express app which we can use for socket communication
const server = http.createServer(app);

// Setup WebSocket
wsSetup(server);

//Serve static files in public folder with default as index html
const customDirPath = path.join(__dirname, "../public");
app.use(express.static(customDirPath, { index: "index.html" }));

app.get("/websocket", (req, res) => {
	res.sendFile(path.join(customDirPath, "websocket.html"));
});

let port = process.env.PORT || 3003;
server.listen(port, () => {
	console.log("Web socket and express server listening on port: " + port);
});
