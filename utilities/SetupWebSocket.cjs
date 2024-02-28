const WebSocket = require("ws");
const socketIO = require("socket.io");

function setupWebSocket(server) {
	//Create websocket server
	const wss = new WebSocket.Server({ server });
	console.log("Server - WebSocket server is listening");

	// Handle WebSocket connections
	wss.on("connection", (ws, req) => {
		//const clientId = req.headers["x-client-id"] || "";
		console.log(`Server - Web socket client connected`);

		ws.on("message", (message) => {
			//One-on-One message
			ws.send(`One-on-One Echo: ${message}`);
			//Send message to all clients
			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(`Broadcast Echo: ${message}`);
				}
			});
		});

		ws.on("close", () => {
			console.log(`Server - Web socket client disconnected`);
		});
	});
}

function setupWebSocketIO(server) {
	// Create Socket.IO server
	const io = socketIO(server);
	console.log("WebSocket server is listening");

	// Handle Socket.IO connections
	io.on("connection", (socket) => {
		console.log("Socket client connected");

		// Handle message received from client
		socket.on("message", (message) => {
			console.log(`Client sent: ${message}`);

			// Echo the message back to the client
			socket.emit("echo", `One-on-One Echo: ${message}`);

			// Broadcast the message to all connected clients (including the sender)
			io.emit("broadcast", `Broadcast Echo: ${message}`);
		});

		// Handle disconnection
		socket.on("disconnect", () => {
			console.log("Socket client disconnected");
		});
	});
}

module.exports = {
	setupWebSocket,
	setupWebSocketIO,
};
