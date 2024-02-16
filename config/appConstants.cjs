"use strict";
require("dotenv").config();

let appConstants = {};
appConstants.APP_PORT = process.env.PORT;
appConstants.MONGO_USER = process.env.MONGO_USER;
appConstants.MONGO_PWD = process.env.MONGO_PWD;
appConstants.MONGO_HOST = process.env.MONGO_HOST;
appConstants.MONGO_PORT = process.env.MONGO_PORT;
appConstants.MONGO_DB_SCALER = process.env.MONGO_DB_SCALER;

module.exports = { appConstants };
