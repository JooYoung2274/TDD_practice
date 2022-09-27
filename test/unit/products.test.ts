// 1. 해야 할 일 먼저 생각
// 2. 단위 테스트 작성
// 3. 테스트에 대하응하는 실제 코드

import { ProductController } from "../../controller/products";

const productController = new ProductController();

describe("Product Controller Create", () => {
  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
});
