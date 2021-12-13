const express = require("express");
const router = express.Router();
const productController = require("./controller/products");

// router.get("/", productController.hello);
router.post("/products", productController.createProduct);

module.exports = router;
