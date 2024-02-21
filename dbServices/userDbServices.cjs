const UserModel = require("../models/userModel.cjs");
const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

async function createUser(userData) {
	try {
		return await UserModel.create(userData);
	} catch (error) {
		throw new Error(
			`User DB Service Exception => Failed to create user from User model: ${error.message}`
		);
	}
}

async function createUserWithValidation(userData) {
	try {
		// Create a new user instance using the Mongoose model
		const newUser = new UserModel(userData);
		// Attempt to save the new user to the database
		const savedUser = await newUser.save();
		// Log a success message if the user is saved successfully
		console.log(`User with email ${savedUser.email} added successfully!`);
		return savedUser;
	} catch (error) {
		console.log(error);
		// Handle validation errors
		if (error.name === "ValidationError") {
			console.error("Validation Error:");
			for (const [key, value] of Object.entries(error.errors)) {
				console.error(`${key}: ${value.message}`);
			}
			const validationError = new Error(
				`ValidationError => Failed to create user from User model: ${error.message}`
			);
			validationError.status = HttpStatusWithCode.UNPROCESSABLE_ENTITY_422;
			throw validationError;
		} else {
			// Log other errors
			console.error("Error:", error.message);
			const serverError = new Error(
				`User DB Service Exception => Failed to create user from User model: ${error.message}`
			);
			serverError.status = HttpStatusWithCode.INTERNAL_SERVER_ERROR_500;
			throw serverError;
		}
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

async function getAverageAgeOfUsers() {
	try {
		const result = await UserModel.aggregate([
			{
				$group: {
					_id: null,
					averageAge: { $avg: "$age" },
				},
			},
		]);
		if (result.length > 0) {
			return result[0].averageAge;
		} else {
			const notFoundError = new Error(
				`User DB Service Exception NotFoundError => No records found for user model: ${error.message}`
			);
			notFoundError.status = HttpStatusWithCode.NOT_FOUND_404;
			throw notFoundError;
		}
	} catch (error) {
		const serverError = new Error(
			`User DB Service Exception => Failed to get average age of all users from User model: ${error.message}`
		);
		serverError.status = HttpStatusWithCode.INTERNAL_SERVER_ERROR_500;
		throw serverError;
	}
}

module.exports = {
	createUser,
	createUserWithValidation,
	getAllUsers,
	getAverageAgeOfUsers,
};
