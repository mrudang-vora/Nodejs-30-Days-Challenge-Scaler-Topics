const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
	productCategoryName: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
		trim: true,
	},
});
module.exports = productCategorySchema;
