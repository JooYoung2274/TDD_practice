import express from 'express';

import Container from 'typedi';

import ProductsController from '../products/products.controller';

const router = express.Router();
const productController = Container.get(ProductsController);

// router.get("/", productController.hello);
router.post('/products', (req, res, next) => productController.createProduct(req, res, next));

router.get('/products/:name', (req, res, next) => productController.getProduct(req, res, next));
//
// router.get('/products/:productId', productController.getProductById);
//
router.put('/products/:name', (req, res, next) => productController.updateProduct(req, res, next));

export default router;
