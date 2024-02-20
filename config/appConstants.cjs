"use strict";
require("dotenv").config();

let appConstants = {};

//ENV constants
appConstants.APP_PORT = process.env.PORT;
appConstants.MONGO_USER = process.env.MONGO_USER;
appConstants.MONGO_PWD = process.env.MONGO_PWD;
appConstants.MONGO_HOST = process.env.MONGO_HOST;
appConstants.MONGO_PORT = process.env.MONGO_PORT;
appConstants.MONGO_DB_SCALER = process.env.MONGO_DB_SCALER;

//Schema validation messages
appConstants.USER_SCHEMA_EMAIL_VALIDATION_MSG =
	"Email is not in correct format";

//Regular expressions
appConstants.EMAIL_REGEX =
	/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z]{2,15})+$/;

module.exports = { appConstants };
