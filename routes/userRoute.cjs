const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.cjs");
const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

router.get("/", (req, res) => {
	res.status(HttpStatusWithCode.OK_200).send({
		msg: "User Route Get API",
		description: "Welcome User Route API listing",
	});
});

router.post("/users", userController.createUser);
router.post("/usersValidation", userController.createUserWithValidation);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/average-age", userController.getAverageAgeOfUsers);
module.exports = router;
