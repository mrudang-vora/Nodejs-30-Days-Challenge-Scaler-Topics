const UserModel = require("../models/userModel.cjs");

async function createUser(userData) {
	try {
		return await UserModel.create(userData);
	} catch (error) {
		throw new Error(
			`User DB Service Exception => Failed to create user from User model: ${error.message}`
		);
	}
}

async function getAllUsers() {
	try {
		return await UserModel.find();
	} catch (error) {
		throw new Error(
			`User DB Service Exception => Failed to get all users from User model: ${error.message}`
		);
	}
}

module.exports = { createUser, getAllUsers };
