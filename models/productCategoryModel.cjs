const mongoose = require("mongoose");
const productCategorySchema = require("./schemas/productCategorySchema.cjs");

const ProductCategoryModel = mongoose.model(
	"ProductCategory",
	productCategorySchema
);

module.exports = ProductCategoryModel;
