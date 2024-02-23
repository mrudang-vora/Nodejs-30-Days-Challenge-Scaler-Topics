const productServices = require("../services/productServices.cjs");
const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

async function createProduct(req, res, next) {
	try {
		const productData = req.body;
		const newProduct = await productServices.createProduct(productData);
		res.status(HttpStatusWithCode.CREATED_201).send(newProduct);
	} catch (error) {
		next(error);
	}
}

async function getAllProducts(req, res, next) {
	try {
		const products = await productServices.getAllProducts();
		res.status(HttpStatusWithCode.OK_200).send(products);
	} catch (error) {
		next(error);
	}
}

async function updateProduct(req, res, next) {
	try {
		const productId = req.params.id;
		const productData = req.body;
		const updatedProduct = await productServices.updateProduct(
			productId,
			productData
		);
		res.status(HttpStatusWithCode.OK_200).send(updatedProduct);
	} catch (error) {
		next(error);
	}
}

async function deleteProduct(req, res, next) {
	try {
		const productId = req.params.id;
		console.log(productId);
		const deletedProduct = await productServices.deleteProduct(productId);
		res.status(HttpStatusWithCode.NO_CONTENT_204).send(deletedProduct);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
};
