const userDbService = require("../dbServices/userDbServices.cjs");

async function createUser(userData) {
	try {
		return await userDbService.createUser(userData);
	} catch (error) {
		throw new Error(
			`User Service Exception - Failed to create user: ${error.message}`
		);
	}
}

async function getAllUsers() {
	try {
		return await userDbService.getAllUsers();
	} catch (error) {
		throw new Error(
			`User Service Exception - Failed to fetch all users: ${error.message}`
		);
	}
}

module.exports = { createUser, getAllUsers };
