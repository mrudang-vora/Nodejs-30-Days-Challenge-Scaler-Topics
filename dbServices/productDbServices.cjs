const ProductModel = require("../models/productModel.cjs");
const ProductCategoryModel = require("../models/productCategoryModel.cjs");
const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

async function createProduct(productData) {
	try {
		let category;
		// If category information is separate, extract it from productData
		const { productCategory, ...productInfo } = productData;

		// Check if productCategory exists
		if (productCategory && productCategory.productCategoryName) {
			// Find or create the corresponding category by name
			category = await ProductCategoryModel.findOneAndUpdate(
				{ productCategoryName: productCategory.productCategoryName },
				{ productCategoryName: productCategory.productCategoryName },
				{ upsert: true, new: true }
			);
		}

		// Set the productCategory field to the ObjectId of the category
		productInfo.productCategory = category ? category._id : null;

		// Create a new product instance using the Mongoose model
		const newProduct = new ProductModel(productInfo);

		// Attempt to save the new product to the database
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

async function getProductsPopulatedWithCategory() {
	try {
		const productsWithCategory = await ProductModel.find().populate(
			"productCategory"
		);
		return productsWithCategory;
	} catch (error) {
		serverError = formatError("get categorized", error);
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

async function createProductNameIndex() {
	try {
		await ProductModel.createIndexes({ name: 1 });
		console.log(
			'Index on "name" field of Product collection created successfully.'
		);
	} catch (error) {
		serverError = formatError("create index", error);
		throw serverError;
	}
}

async function getProductStatistics() {
	try {
		const productAggregatedStats = await ProductModel.aggregate([
			{
				$group: {
					_id: null,
					totalProducts: { $sum: 1 },
					averagePrice: { $avg: "$price" },
					highestQuantity: { $max: "$quantity" },
				},
			},
		]);
		const prodStats = {
			totalProducts: productAggregatedStats[0].totalProducts,
			averagePrice: productAggregatedStats[0].averagePrice,
			highestQuantity: productAggregatedStats[0].highestQuantity,
		};
		return prodStats;
	} catch (error) {
		serverError = formatError("get stats of", error);
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

// Initialize the service by creating the index
createProductNameIndex();

module.exports = {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
	getProductsPopulatedWithCategory,
	getProductStatistics,
};
