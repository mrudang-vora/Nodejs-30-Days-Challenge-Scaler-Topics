const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.cjs");
const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

router.get("/", (req, res) => {
	res.status(HttpStatusWithCode.OK_200).send({
		msg: "Product Route Get API",
		description: "Welcome Product Route API listing",
	});
});

router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.get("/products", productController.getAllProducts);
router.delete("/products/:id", productController.deleteProduct);
module.exports = router;
