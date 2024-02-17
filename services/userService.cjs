const userDbService = require("../dbServices/userDbServices.cjs");

async function createUser(userData) {
	try {
		return await userDbService.createUser(userData);
	} catch (error) {
		throw new Error(`Failed to create user: ${error.message}`);
	}
}

module.exports = { createUser };
