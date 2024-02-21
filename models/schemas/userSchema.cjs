const mongoose = require("mongoose");
const { appConstants } = require("../../config/appConstants.cjs");
const validateEmail = require("../validators/emailValidator.cjs");

// Define the Mongoose schema for the User
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 50,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: false,
		minlength: 5,
		maxlength: 60,
		trim: true,
		validate: {
			validator: function (value) {
				return validateEmail(value);
			},
			message: (props) =>
				appConstants.USER_SCHEMA_EMAIL_VALIDATION_MSG + `: ${props.value}`,
		},
	},
	age: {
		type: Number,
		required: false,
		min: 0,
		max: 150,
	},
});

module.exports = userSchema;
