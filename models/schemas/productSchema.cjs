const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
		trim: true,
	},
	price: {
		type: Number,
		required: false,
		min: 0,
		max: 1000000000,
	},
	quantity: {
		type: Number,
		required: false,
		min: 0,
		max: 1000000,
	},
	productCategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ProductCategory",
	},
});
module.exports = productSchema;
