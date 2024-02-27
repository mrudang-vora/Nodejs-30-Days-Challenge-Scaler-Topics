require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const {
	authenticate,
	authorize,
} = require("../middlewares/authMiddleware.cjs");
const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");
const { appConstants } = require("../config/appConstants.cjs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	let objResponse = {
		application: "Scaler30DayChallenge",
		message: "Challenge 27 - Authenticate and Authorize",
	};
	res.status(HttpStatusWithCode.OK_200).send(objResponse);
});

app.post("/login", loginHandler);

app.get(
	"/getAdminDashboard",
	authenticate,
	authorize("admin"),
	adminRouteHandler
);

function loginHandler(req, res) {
	const { username, password } = req.body;
	const authenticatedUser = authenticateUser(username, password);
	let objResponse = {
		application: "Scaler30DayChallenge",
		authToken: "",
		message: "Authentication Successful",
	};
	if (authenticatedUser) {
		const token = generateAuthToken(authenticatedUser);
		objResponse.authToken = token;
		res.status(HttpStatusWithCode.OK_200).send(objResponse);
	} else {
		objResponse.message = "No user found";
		res.status(HttpStatusWithCode.UNPROCESSABLE_ENTITY_422).send(objResponse);
	}
}

function authenticateUser(username, password) {
	// Ideally this function calls DB but we are calling demo data
	const users = [
		{ id: 1, username: "admin", password: "admin", role: "admin" },
		{ id: 2, username: "user", password: "user", role: "user" },
	];
	// Find user with matching username and password
	const user = users.find(
		(user) => user.username === username && user.password === password
	);
	return user;
}

function generateAuthToken(user) {
	const jwtSecret = process.env.JWT_SECRET;
	return jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
		expiresIn: "1h",
	});
}

function adminRouteHandler(req, res) {
	res.status(HttpStatusWithCode.OK_200).send(req.objResponse);
}

let port = appConstants.APP_PORT || 3003;

app.listen(port, () => {
	console.log("Express server listening on port: " + port);
});
