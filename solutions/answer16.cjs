const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");
const { appConstants } = require("../config/appConstants.cjs");
const express = require("express");
const mongoose = require("mongoose");
const { connectToMongoDB } = require("../config/mongo.config.cjs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	return res.status(HttpStatusWithCode.OK_200).send("Welcome to Challenge 16");
});
app.get("/connectMongo", (req, res) => {
	connectToMongoDB();
	return res.status(HttpStatusWithCode.OK_200).send("Connected Mongo");
});

let port = appConstants.APP_PORT || 3003;
app.listen(port, () => {
	console.log("Express server listening on port: " + port);
});
