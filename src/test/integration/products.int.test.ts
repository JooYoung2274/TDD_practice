import request from 'supertest';
import { app } from '../../app';

const newProduct = {
    name: 'kim',
    description: 'good',
    price: 15,
};

const updateProductJson = {
    name: 'test',
    description: 'good',
    price: 15,
};

it('POST /api/products', async () => {
    const response = await request(app).post('/api/products').send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
});

it('should return 500 on POST /api/products', async () => {
    const response = await request(app).post('/api/products').send({ name: 'Lee' });
    expect(response.statusCode).toBe(500);
    console.log(response.body); // 실제 에러 메세지 확인하려고 찍음
    expect(response.body).toStrictEqual({ message: 'Product validation failed: description: Path `description` is required.' });
});

it('GET /api/products', async () => {
    const response = await request(app).get('/api/products/kim');
    expect(response.statusCode).toBe(201);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined(); // toBeDefined()는 리턴값이 있으면 통과시킴
    expect(response.body[0].description).toBe('good');
});
