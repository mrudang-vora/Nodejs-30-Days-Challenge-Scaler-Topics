const mongoose = require("mongoose");
const { appConstants } = require("./appConstants.cjs");

mongoose.pluralize(null);

let mongoUri = `mongodb://${appConstants.MONGO_USER}:${appConstants.MONGO_PWD}@${appConstants.MONGO_HOST}:${appConstants.MONGO_PORT}/${appConstants.MONGO_DB_SCALER}`;
if (appConstants.MONGO_USER === "") {
	mongoUri = `mongodb://${appConstants.MONGO_HOST}:${appConstants.MONGO_PORT}/${appConstants.MONGO_DB_SCALER}`;
}
let mongoOptions = {
	autoIndex: false,
};

function connectToMongoDB() {
	const mongoScalerDBConn = mongoose.createConnection(mongoUri, mongoOptions);
	let mongoDBStatus = "";
	// Start the MongoDB connection
	mongoScalerDBConn.on("connected", () => {
		mongoDBStatus = "MongoDB connection established successfully";
		console.log(mongoDBStatus);
	});

	mongoScalerDBConn.on("error", (err) => {
		mongoDBStatus = "MongoDB connection error:" + err;
		console.error(mongoDBStatus);
	});

	mongoScalerDBConn.on("disconnected", () => {
		mongoDBStatus = "MongoDB connection disconnected";
		console.log(mongoDBStatus);
	});
	return mongoDBStatus;
}

module.exports = {
	connectToMongoDB,
};
