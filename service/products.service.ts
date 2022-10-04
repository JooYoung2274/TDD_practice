import { createProductInputDto } from '../DTO/createProduct.input.dto';
import { ProductsRepository } from '../repository/products.repository';
import { Service } from 'typedi';

@Service()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) {}

    async createProduct(createProductInputData: createProductInputDto) {
        const result = await this.productsRepository.createProduct(createProductInputData);
        return result;
    }

    async getProduct(name: string) {
        const result = await this.productsRepository.getProduct(name);
        return result;
    }

    async updateProduct(name: string) {
        const result = await this.productsRepository.updateProduct(name);
        return result;
    }
}
