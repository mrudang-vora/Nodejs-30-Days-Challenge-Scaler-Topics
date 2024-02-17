const UserModel = require("../models/userModel.cjs");

async function createUser(userData) {
	try {
		return await UserModel.create(userData);
	} catch (error) {
		throw new Error(`Failed to create user from db service: ${error.message}`);
	}
}

module.exports = { createUser };
