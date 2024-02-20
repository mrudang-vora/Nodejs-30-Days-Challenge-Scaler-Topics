const { appConstants } = require("../../config/appConstants.cjs");

function validateEmail(email) {
	let emailRegex = appConstants.EMAIL_REGEX;
	return emailRegex.test(email);
}

module.exports = validateEmail;
