const productDBServices = require("../dbServices/productDbServices.cjs");

async function createProduct(productData) {
	return await productDBServices.createProduct(productData);
}

async function getAllProducts() {
	return await productDBServices.getAllProducts();
}

async function getProductsPopulatedWithCategory() {
	return await productDBServices.getProductsPopulatedWithCategory();
}

async function updateProduct(productId, productData) {
	return await productDBServices.updateProduct(productId, productData);
}

async function deleteProduct(productId) {
	return await productDBServices.deleteProduct(productId);
}

module.exports = {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
	getProductsPopulatedWithCategory,
};
