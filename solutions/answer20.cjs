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
		.send("Welcome to Challenge 20 - Average age of user");
});

// Routes
app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	const objError = { error: 1, message: err.message };
	const statusCode = err.status || HttpStatusWithCode.INTERNAL_SERVER_ERROR_500;
	res.status(statusCode).send(objError);
});

let port = appConstants.APP_PORT || 3003;

app.listen(port, () => {
	console.log("Express server listening on port: " + port);
});
