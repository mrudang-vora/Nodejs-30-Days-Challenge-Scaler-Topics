const ProductModel = require("../models/productModel.cjs");
const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

async function createProduct(productData) {
	try {
		// Create a new user instance using the Mongoose model
		const newProduct = new ProductModel(productData);
		// Attempt to save the new user to the database
		const savedProduct = await newProduct.save();
		// Log a success message if the product is saved successfully
		console.log(`Product added successfully - ${savedProduct.name}`);
		return savedProduct;
	} catch (error) {
		serverError = formatError("create", error);
		throw serverError;
	}
}

async function getAllProducts() {
	try {
		return await ProductModel.find();
	} catch (error) {
		serverError = formatError("get", error);
		throw serverError;
	}
}

async function updateProduct(productId, productData) {
	try {
		/*
        const updatedProduct = await ProductModel.updateOne(
			{ _id: productId },
			{ $set: productData }
		);
        */
		const updatedProduct = await ProductModel.findByIdAndUpdate(
			productId,
			productData,
			{ new: true }
		);
		// Log a success message if the product is updated successfully
		console.log(`Product updated successfully - ${updatedProduct.name}`);
		return updatedProduct;
	} catch (error) {
		serverError = formatError("update", error);
		throw serverError;
	}
}

async function deleteProduct(productId) {
	try {
		//const deletedProduct = await UserModel.deleteOne({ _id: productId });
		const deletedProduct = await ProductModel.findByIdAndDelete(productId);

		// Log a success message if the product is updated successfully
		console.log(`Product deleted successfully - ${deleteProduct.name}`);
		return deletedProduct;
	} catch (error) {
		serverError = formatError("delete", error);
		throw serverError;
	}
}

function formatError(operation, error) {
	console.error("Error:", error.message);
	const serverError = new Error(
		`${__filename} Exception => Failed to ${operation} product: ${error.message}`
	);
	serverError.status = HttpStatusWithCode.INTERNAL_SERVER_ERROR_500;
}

module.exports = {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
};
