import { createProductInputDto } from '../DTO/createProduct.input.dto';
import { Product } from '../models/Product';
import { Service } from 'typedi';

@Service()
export class ProductsRepository {
    constructor() {}

    async createProduct(createProductInputData: createProductInputDto) {
        const result = await Product.create(createProductInputData);
        return result;
    }

    async getProduct(name: string) {
        const result = await Product.find({ name: name });
        return result;
    }

    async updateProduct(name: string) {
        const result = await Product.findOneAndUpdate({ name: name }, { name: 'test' });
        return result;
    }
}
