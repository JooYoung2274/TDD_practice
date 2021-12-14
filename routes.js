const express = require("express");
const router = express.Router();
const productController = require("./controller/products");

// router.get("/", productController.hello);
router.post("/products", productController.createProduct);

router.get("/products", productController.getProducts);

router.get("/products/:productId", productController.getProductById);

router.put("/products/:productId", productController.updateProduct);

module.exports = router;
