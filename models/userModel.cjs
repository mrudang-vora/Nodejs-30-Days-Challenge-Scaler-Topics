const mongoose = require("mongoose");
const userSchema = require("./schemas/userSchema.cjs");

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
