const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");
const { appConstants } = require("../config/appConstants.cjs");
const express = require("express");
const { genericErrorHandler } = require("../middlewares/errorHandler.cjs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	return res
		.status(HttpStatusWithCode.OK_200)
		.send("Welcome to Challenge 29 - Error Handling Middleware");
});

app.get("/syntax-error", (req, res, next) => {
	// Intentionally malformed JSON syntax
	const invalidJson = '{ "key": "value" '; // Missing closing brace
	try {
		const parsedJson = JSON.parse(invalidJson);
		res.json(parsedJson);
	} catch (error) {
		// Pass the error to the errorHandler middleware
		next(error);
	}
});

app.use(genericErrorHandler);
let port = appConstants.APP_PORT || 3003;

app.listen(port, () => {
	console.log("Express server listening on port: " + port);
});
