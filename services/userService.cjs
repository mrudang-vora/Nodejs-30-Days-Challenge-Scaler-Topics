const userDbService = require("../dbServices/userDbServices.cjs");

async function createUser(userData) {
	try {
		return await userDbService.createUser(userData);
	} catch (error) {
		throw error;
	}
}

async function createUserWithValidation(userData) {
	try {
		return await userDbService.createUserWithValidation(userData);
	} catch (error) {
		throw error;
	}
}

async function getAllUsers() {
	try {
		return await userDbService.getAllUsers();
	} catch (error) {
		throw error;
	}
}

module.exports = { createUser, createUserWithValidation, getAllUsers };
