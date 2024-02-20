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

async function createUserWithValidation(req, res, next) {
	try {
		const userData = req.body;
		const newUser = await userService.createUserWithValidation(userData);
		res.status(HttpStatusWithCode.CREATED_201).send(newUser);
	} catch (error) {
		next(error);
	}
}

async function getAllUsers(req, res, next) {
	try {
		const users = await userService.getAllUsers();
		res.status(HttpStatusWithCode.OK_200).send(users);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	createUser,
	createUserWithValidation,
	getAllUsers,
};
