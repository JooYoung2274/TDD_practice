const productModel = require("../models/Product");

// 단위테스트는 몽고디비는 잘된다고 가정하고 진행
exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error); //비동기 에러가 발생하면 서버가 죽기때문에 next()안에 error를 넣어서 넘겨줘야함!!
  }
};

// 통합테스트는 전부 확인해야함

exports.getProducts = async (req, res, next) => {
  try {
    const allproducts = await productModel.find({});
    res.status(200).json(allproducts);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send({});
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productModel.deleteOne(req.params.productId);
    if (product) {
      res.status(200);
    } else {
      res.status(404);
    }
  } catch (error) {
    next(error);
  }
};
