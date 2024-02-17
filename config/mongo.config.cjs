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
		mongoDBStatus =
			"MongoDB connection established successfully using create connection";
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
}

//Challenge 17 mentioned to connect Mongo using mongoose.connect
async function connectToMongo(url, options = {}) {
	try {
		await mongoose.connect(url, options);
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection error:", error.message || error);
	}
}

// Initial connection
connectToMongo(mongoUri, mongoOptions);

//Switch database name in existing connection
function getDatabaseConnection(dbName) {
	if (mongoose.connection.name !== dbName) {
		//clear model cache
		mongoose.connection.models = {};
		//switch database
		mongoose.connection.useDb(dbName, {
			useCache: false,
			noListener: true,
		});
	}
	return mongoose.connection;
}

module.exports = {
	connectToMongoDB,
	getDatabaseConnection,
};
