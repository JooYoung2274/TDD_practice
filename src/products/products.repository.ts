import { createProductInputDto } from '../DTO/createProduct.input.dto';
import { Producer } from '../models/Producer';

import { Service } from 'typedi';
import { TotalData } from '../models/TotalData';

@Service()
class ProductsRepository {
    constructor() {}

    async createProduct(createProductInputData: createProductInputDto) {
        const result = await Producer.create(createProductInputData);
        const d = await TotalData.create(createProductInputData);
        return result;
    }

    async getProduct(name: string) {
        const result = await Producer.find({ name: name });
        return result;
    }

    async updateProduct(name: string) {
        const result = await Producer.findOneAndUpdate({ name: name }, { name: 'test' });
        return result;
    }
}

export default ProductsRepository;
