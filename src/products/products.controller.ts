// import  productModel  from "../models/Product";

// 단위테스트는 몽고디비는 잘된다고 가정하고 진행
// 통합테스트는 전부 확인해야함
import { Service } from 'typedi';
import { Product } from '../models/Product';
import { NextFunction, Request, Response } from 'express';
import { createProductInputDto } from '../DTO/createProduct.input.dto';
import ProductsService from './products.service';

@Service()
class ProductsController {
    constructor(private productsService: ProductsService) {}

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const createProductInputData: createProductInputDto = req.body;
            const result = await this.productsService.createProduct(createProductInputData);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;
            const result = await this.productsService.getProduct(name);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;
            const result = await this.productsService.updateProduct(name);

            if (!result) {
                res.status(400).json({ message: 'invalid name' });
            } else {
                res.status(201).json(result);
            }
        } catch (err) {
            next(err);
        }
    }
}

export default ProductsController;
