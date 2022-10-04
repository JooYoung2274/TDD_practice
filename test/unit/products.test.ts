// 1. 해야 할 일 먼저 생각
// 2. 단위 테스트 작성
// 3. 테스트에 대하응하는 실제 코드 작성

import { ProductController } from '../../controller/products';
import { Product } from '../../models/Product';
import httpMocks from 'node-mocks-http';
import newProduct from '../data/new-product.json';
import updateProductJson from '../data/update-product.json';
import { NextFunction, Request, Response } from 'express';

Product.create = jest.fn(); // mock 함수로 만들어줌. (데이터 베이스는)
Product.find = jest.fn();
Product.findOneAndUpdate = jest.fn();
//이후에 의존성 분리해서 repository layer 로 나누게 되면 mock 사용 안해도 될듯

const productController = new ProductController();

let req: Request, res: Response, next: NextFunction;

// 모든 테스트코드들이 실행되기 전엔 먼저 req, res, next 를 mock 함수로 할당하고 실행됨.
beforeEach(() => {
    // node-mocks-http 추가
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('Product Controller Create', () => {
    // 해당 describe 안에 있는 테스트코드들이 실행되기 전에 먼저 req.body 에 newProduct 를 할당하고 실행됨
    // req.body 값 임의로 추가
    beforeEach(() => {
        req.body = newProduct;
    });
    // 1. 먼저 함수가 있는지에 대한 테스트코드 작성
    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    });

    // 2. 함수를 실행할 때 어떤 함수가 실행되는지에 대한 테스트 코드 작성
    // 함수가 async/await 사용하고 있으면 테스트코드에서도 작성해줘야함
    it('should call Product.create', async () => {
        await productController.createProduct(req, res, next); // productController.createProduct() 함수가 호출될 때,
        expect(Product.create).toBeCalledWith(newProduct); // Product.create 라는 함수가 newProduct 라는 객체와 같이 호출 되는지 확인하는 테스트코드
    });

    // 3. 함수를 실행하면 201 status code 가 리턴되는지에 대한 테스트 코드 작성
    // 함수가 async/await 사용하고 있으면 테스트코드에서도 작성해줘야함
    it('should return 201 response status code', async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
    });

    // 4. 함수를 실행하면 결과값이 리턴되는지에 대한 테스트 코드 작성
    it('should return json body in response ', async () => {
        // @ts-ignore
        Product.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        // @ts-ignore
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });

    // 5. 에러 발생 시 어떤 메세지가 리턴되는지에 대한 테스트 코드 작성
    it('should handle errors', async () => {
        const errorMessage = { message: 'description property missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        // @ts-ignore
        Product.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('Product Controller Read', () => {
    beforeEach(() => {
        req.params = { name: 'kim' };
    });
    it('function', () => {
        expect(typeof productController.getProduct).toBe('function');
    });

    it('Product.find({})', async () => {
        await productController.getProduct(req, res, next);
        expect(Product.find).toHaveBeenCalledWith(req.params);
    });

    it('should return 201 response stats code ', async () => {
        await productController.getProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        // @ts-ignore
        expect(res._isEndCalled).toBeTruthy();
    });

    it('should return json body in response', async () => {
        // @ts-ignore
        Product.find.mockReturnValue(newProduct);
        await productController.getProduct(req, res, next);
        // @ts-ignore
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });

    it('should handle errors ', async () => {
        const errorMessage = { message: 'description property missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        // @ts-ignore
        Product.find.mockReturnValue(rejectedPromise);
        await productController.getProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('Product Controller Update', () => {
    beforeEach(() => {
        req.params = { name: 'kim' };
    });

    // 1. 함수가 있는지?
    it('function ', () => {
        expect(typeof productController.updateProduct).toBe('function');
    });

    // 2. Model.Update()가 어떤 값과 함께 불러와지는지
    it('Product.updateOne()', async () => {
        await productController.updateProduct(req, res, next);
        expect(Product.findOneAndUpdate).toHaveBeenCalledWith(req.params);
    });

    // 3. 성공 시 201상태코드를 리턴하는지
    it('should return 201 status code', async () => {
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        // @ts-ignore
        expect(res._isEndCalled).toBeTruthy();
    });

    // 4. 성공 시 json type을 리턴하는지
    it('should return json type', async () => {
        // @ts-ignore
        Product.findOneAndUpdate.mockReturnValue(updateProductJson);
        await productController.updateProduct(req, res, next);
        // @ts-ignore
        expect(res._getJSONData()).toStrictEqual(updateProductJson);
    });

    // 5. invalid name 입력시 400코드 리턴
    it('should return 400 status code', async () => {
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(400);
    });

    // 6. invalid name 입력시 message 리턴
    it('should return error message', async () => {
        // @ts-ignore
        Product.findOneAndUpdate.mockReturnValue({ message: 'invalid name' });
        await productController.updateProduct(req, res, next);
        // @ts-ignore
        expect(res._getJSONData()).toStrictEqual({ message: 'invalid name' });
    });

    // 6. error 발생 시 message:"" 를 리턴하는지
    it('should handle errors ', async () => {
        const errorMessage = { message: 'description property missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        // @ts-ignore
        Product.findOneAndUpdate.mockReturnValue(rejectedPromise);
        await productController.updateProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
