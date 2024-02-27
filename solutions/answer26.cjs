const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");
const { appConstants } = require("../config/appConstants.cjs");
const express = require("express");
require("../config/mongo.config.cjs");
const userRoutes = require("../routes/userRoute.cjs");
const productRoutes = require("../routes/productRoute.cjs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	return res
		.status(HttpStatusWithCode.OK_200)
		.send("Welcome to Challenge 26 - Aggregation pipeline");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

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
