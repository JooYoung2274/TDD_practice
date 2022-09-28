// 1. 해야 할 일 먼저 생각
// 2. 단위 테스트 작성
// 3. 테스트에 대하응하는 실제 코드 작성

import {ProductController} from '../../controller/products';
import {Product} from '../../models/Product';
import httpMocks from 'node-mocks-http';
import newProduct from '../data/new-product.json';

Product.create = jest.fn(); // mock 함수로 만들어줌. (데이터 베이스는)
//이후에 의존성 분리해서 repository layer 로 나누게 되면 mock 사용 안해도 될듯

const productController = new ProductController();

describe('Product Controller Create', () => {
    // 1. 먼저 함수가 있는지에 대한 테스트코드 작성
    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    });
    it('should call Product.create', () => {
        // node-mocks-http 추가
        let req = httpMocks.createRequest();
        let res = httpMocks.createResponse();
        let next = null;

        //req.body 값 임의로 추가
        req.body = newProduct;
        // @ts-ignore
        productController.createProduct(req, res, next); // productController.createProduct() 함수가 호출될 때,
        expect(Product.create).toBeCalledWith(newProduct); // Product.create 라는 함수가 newProduct 라는 객체와 같이 호출 되는지 확인하는 테스트코드
    });
});
