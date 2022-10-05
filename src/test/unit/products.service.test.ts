import ProductsService from '../../products/products.service';

describe('products Service layer unit test', () => {
    const newProduct = {
        name: 'kim',
        description: 'good',
        price: 15,
    };

    const updateProductJson = {
        name: 'test',
        description: 'good',
        price: 15,
    };

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
