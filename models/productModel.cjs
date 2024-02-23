const mongoose = require("mongoose");
const productSchema = require("./schemas/productSchema.cjs");

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
