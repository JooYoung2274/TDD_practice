import express from 'express';

const router = express.Router();
import { ProductController } from './controller/products';

const productController = new ProductController();

// router.get("/", productController.hello);
router.post('/products', productController.createProduct);

router.get('/products/:name', productController.getProduct);
//
// router.get('/products/:productId', productController.getProductById);
//
// router.put('/products/:productId', productController.updateProduct);

export default router;
