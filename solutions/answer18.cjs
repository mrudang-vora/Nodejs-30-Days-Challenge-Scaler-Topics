const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");
const { appConstants } = require("../config/appConstants.cjs");
const express = require("express");
require("../config/mongo.config.cjs");
const userRoutes = require("../routes/userRoute.cjs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	return res
		.status(HttpStatusWithCode.OK_200)
		.send("Welcome to Challenge 18 - Get all users from Mongo");
});

// Routes
app.use("/api", userRoutes);

let port = appConstants.APP_PORT || 3003;

app.listen(port, () => {
	console.log("Express server listening on port: " + port);
});
