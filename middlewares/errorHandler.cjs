const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

function negativeIntegerHandler(req, res, next) {
	let queryParams = req.query;
	let response = {
		success: 0,
		message: "Error:- ",
	};
	let number = parseInt(queryParams?.number);
	if (Number.isInteger(number) && number < 0) {
		response.message += ` Number ${number} is not a positive number.`;
		res.status(HttpStatusWithCode.BAD_REQUEST_400).send(response);
	} else if (isNaN(number)) {
		response.message += ` No number provided.`;
		res.status(HttpStatusWithCode.BAD_REQUEST_400).send(response);
	}
	next();
}

function genericErrorHandler(err, req, res, next) {
	console.error(err); // Log the error for debugging purposes

	let htmlStatusCode = HttpStatusWithCode.INTERNAL_SERVER_ERROR_500;
	let errorMessage = "Internal Server Error"; // Default error message

	if (err instanceof SyntaxError) {
		htmlStatusCode = HttpStatusWithCode.BAD_REQUEST_400;
		errorMessage = "Syntax Error: " + err.message;
	} else if (err instanceof TypeError) {
		// Handle type errors (e.g., calling a method on undefined)
		htmlStatusCode = HttpStatusWithCode.INTERNAL_SERVER_ERROR_500;
		errorMessage = "Type Error: " + err.message;
	} else if (err instanceof RangeError) {
		// Handle range errors (e.g., index out of bounds)
		htmlStatusCode = HttpStatusWithCode.INTERNAL_SERVER_ERROR_500;
		errorMessage = "Range Error: " + err.message;
	} else if (err instanceof ReferenceError) {
		// Handle reference errors (e.g., accessing an undefined variable)
		htmlStatusCode = HttpStatusWithCode.INTERNAL_SERVER_ERROR_500;
		errorMessage = "Reference Error: " + err.message;
	} else if (err.name === "ValidationError") {
		// Handle validation errors (e.g., input validation failed)
		htmlStatusCode = HttpStatusWithCode.UNPROCESSABLE_ENTITY_422;
		errorMessage = "Validation Error: " + err.message;
	} else if (err.name === "MongoError" && err.code === 11000) {
		// Handle duplicate key error for MongoDB unique constraint
		htmlStatusCode = HttpStatusWithCode.CONFLICT_409;
		errorMessage = "Duplicate Key Error: " + err.message;
	}

	// Send an error response to the client with only the error message
	res.status(htmlStatusCode).json({ error: errorMessage });
}

module.exports = {
	negativeIntegerHandler,
	genericErrorHandler,
};
