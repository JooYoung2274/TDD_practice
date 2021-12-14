const request = require("supertest");
const newProduct = require("../data/new-product.json");
const app = require("../../server");
const allProducts = require("../data/all-products.json");
const { getProductById } = require("../../controller/products");

let firstProduct;
it("POST /api/products", async () => {
  const response = await request(app).post("/api/products").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
  expect(response.body.price).toBe(newProduct.price);
});

it("should return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({ name: "honde" });
  expect(response.statusCode).toBe(500);
  console.log(response.body);
  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});

it("GET /api/products", async () => {
  const response = await request(app).get("/api/products");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it("GET /api/products/:productId", async () => {
  const response = await request(app).get("/api/products/" + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it("should return 404 on GET /api/products/:productId", async () => {
  const response = await request(app).post("/api/products/dg3r3g3gdfasdfasdf");
  expect(response.statusCode).toBe(404);
});

it("PUT /api/products/:productId", async () => {
  const response = await request(app)
    .put("/api/products/" + firstProduct._id)
    .send({
      name: "updated name",
      description: "updated description",
    });
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe("updated name");
  expect(response.body.description).toBe("updated description");
});

it("should return 404 on PUT /api/products/:productId", async () => {
  const response = await request(app)
    .put("/api/products" + "5f5d79abdc3acb1b95e0eb99")
    .send({
      name: "upd2323ate23d name",
      description: "upda4242te23d description",
    });
  expect(response.statusCode).toBe(404);
});

it("DELETE /api/products/:productId", async () => {
  const response = await request(app).delete(
    "/api/products" + firstProduct._id
  );
  expect(response.statusCode).toBe(404);
});
