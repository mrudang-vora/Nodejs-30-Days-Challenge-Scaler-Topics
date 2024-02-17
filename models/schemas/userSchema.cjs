const mongoose = require("mongoose");

// Define the Mongoose schema for the User
const userSchema = new mongoose.Schema({
	username: String,
	email: String,
});

module.exports = userSchema;
