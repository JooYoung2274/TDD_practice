import { ProductsService } from '../../products/products.service';
import newProduct from '../data/new-product.json';
import updateProductJson from '../data/update-product.json';

describe('products Service layer unit test', () => {
    const productsRepository = {
        createProduct: async () => {
            return newProduct;
        },

        getProduct: async () => {
            return newProduct;
        },

        updateProduct: async () => {
            return updateProductJson;
        },
    };

    const name = 'kim';

    // @ts-ignore
    const productsService = new ProductsService(productsRepository);
    it('createProduct', async () => {
        const result = await productsService.createProduct(newProduct);
        expect(result).toBe(newProduct);
    });

    it('getProduct', async () => {
        const result = await productsService.getProduct(name);
        expect(result).toBe(newProduct);
    });

    it('updateProduct', async () => {
        const result = await productsService.updateProduct(name);
        expect(result).toBe(updateProductJson);
    });
});
