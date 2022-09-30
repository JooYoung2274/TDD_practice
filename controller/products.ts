// import  productModel  from "../models/Product";

// 단위테스트는 몽고디비는 잘된다고 가정하고 진행
// 통합테스트는 전부 확인해야함

import { Product } from '../models/Product';
import { NextFunction, Request, Response } from 'express';

export class ProductController {
    constructor() {}

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await Product.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;
            const result = await Product.find({ name: name });
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }
}
