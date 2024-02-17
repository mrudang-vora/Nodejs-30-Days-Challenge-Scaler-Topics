const userService = require("../services/userService.cjs");
const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

async function createUser(req, res, next) {
	try {
		const userData = req.body;
		const newUser = await userService.createUser(userData);
		res.status(HttpStatusWithCode.CREATED_201).send(newUser);
	} catch (error) {
		next(error);
	}
}

module.exports = { createUser };
