const productController = require("../../controller/products");
const productModel = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");
const allProducts = require("../data/all-products.json");

//db관련 관찰하는 코드
productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.deleteOne = jest.fn();

let req, res, next;
const productId = "dfasdg33";
const updatedProduct = {
  name: "updatedname",
  description: "updateddescription",
};

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

//////////////////////////////////////////////////////////////////////////
describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should can ProductModel.create", async () => {
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  it("should return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201); //201 코드 보냈는지 확인
    expect(res._isEndCalled()).toBeTruthy(); // status뒤에 send가 됐는지 확인
  });

  it("should return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

//////////////////////////////////////////////////////////////////////////
describe("Product Controller Get", () => {
  it("should have a getProducts function", () => {
    expect(typeof productController.getProducts).toBe("function");
  });
  it("should call productModel.find({})", async () => {
    await productController.getProducts(req, res, next);
    expect(productModel.find).toHaveBeenCalledWith({});
  });
  it("should return 200 response", async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response", async () => {
    productModel.find.mockReturnValue(allProducts);
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts);
  });
  it("should handle error", async () => {
    const errorMessage = { message: "Error finding product data" };
    const rejectedPromise = Promise.reject(errorMessage); //Promise.reject를 통해 catch()로 가게함
    productModel.find.mockReturnValue(rejectedPromise);
    await productController.getProducts(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

////////////////////////////////////////////////////////////
describe("Product Controller GetById", () => {
  it("should have a getProductById", () => {
    expect(typeof productController.getProductById).toBe("function");
  });
  it("should call productModel.findById", async () => {
    req.params.productId = productId;
    await productController.getProductById(req, res, next);
    expect(productModel.findById).toBeCalledWith(productId);
  });
  it("should return status code 200 and json body", async () => {
    productModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesnt exist", async () => {
    productModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "Error findById product data" };
    const rejectedPromise = Promise.reject(errorMessage); //Promise.reject를 통해 catch()로 가게함
    productModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProductById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

///////////////////////////////////////////////////////////

describe("Product Controller Update", () => {
  it("should have an updateProduct function", () => {
    expect(typeof productController.updateProduct).toBe("function");
  });
  it("should call productModel.findByIdAndUpdate", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    await productController.updateProduct(req, res, next);
    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      updatedProduct,
      { new: true }
    );
  });

  it("should return json body response code 200", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
    await productController.updateProduct(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedProduct);
  });

  it("should handle 404 when item doesnt exit", async () => {
    productModel.findByIdAndUpdate.mockReturnValue(null);
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle error", async () => {
    const errorMessage = { message: "Error update data" };
    const rejectedPromise = Promise.reject(errorMessage); //Promise.reject를 통해 catch()로 가게함
    productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await productController.updateProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

/////////////////////////////////////////////////////////////////

describe("Product Controller Delete", () => {
  it("should have an deleteProduct function", () => {
    expect(typeof productController.deleteProduct).toBe("function");
  });
  it("should call productModel.deleteOne", async () => {
    req.params.productId = productId;
    await productController.deleteProduct(req, res, next);
    expect(productModel.deleteOne).toHaveBeenCalledWith(productId);
    expect(res.statusCode).toBe(200);
  });
  it("should handle 404", async () => {
    productModel.deleteOne.mockReturnValue(null);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(404);
  });

  it("shoule handle error", async () => {
    const errorMessage = { message: "Error delete data" };
    const rejectedPromise = Promise.reject(errorMessage); //Promise.reject를 통해 catch()로 가게함
    productModel.deleteOne.mockReturnValue(rejectedPromise);
    await productController.deleteProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
