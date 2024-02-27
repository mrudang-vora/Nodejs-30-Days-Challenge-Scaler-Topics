const jwt = require("jsonwebtoken");
const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

function authenticate(req, res, next) {
	const jwtSecret = process.env.JWT_SECRET;
	const authToken = req.headers.authorization;
	let objResponse = {
		isAuthenticated: false,
		application: "Scaler30DayChallenge",
		message: "Token is required",
	};
	if (!authToken) {
		return res.status(HttpStatusWithCode.UNAUTHORIZED_401).send(objResponse);
	}
	try {
		const decodedToken = jwt.verify(authToken, jwtSecret);
		req.decodedRole = decodedToken.role;
		next();
	} catch (error) {
		objResponse.message = "Token is incorrect";
		return res.status(HttpStatusWithCode.UNAUTHORIZED_401).send(objResponse);
	}
}

function authorize(role) {
	return (req, res, next) => {
		const decodedRole = req.decodedRole || "";
		let objResponse = {
			isAuthenticated: true,
			isAuthorized: false,
			application: "Scaler30DayChallenge",
			message: `${decodedRole} role is forbidden to access this.`,
		};

		if (decodedRole.trim().toLowerCase() === role) {
			objResponse.isAuthorized = true;
			objResponse.message = `${decodedRole} authorized to view this page.`;
			req.objResponse = objResponse;
			next();
		} else {
			return res.status(HttpStatusWithCode.FORBIDDEN_403).send(objResponse);
		}
	};
}

module.exports = {
	authenticate,
	authorize,
};
