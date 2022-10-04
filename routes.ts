import express from 'express';

const router = express.Router();
import { ProductsController } from './controller/products.controller';
import { Container } from 'typedi';

const productController = Container.get(ProductsController);

// router.get("/", productController.hello);
router.post('/products', productController.createProduct);

router.get('/products/:name', productController.getProduct);
//
// router.get('/products/:productId', productController.getProductById);
//
router.put('/products/:name', productController.updateProduct);

export default router;
