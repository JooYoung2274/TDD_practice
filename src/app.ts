import 'dotenv/config';
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import Mongo from './models/schema';

// const connect = require('./schema');
import productRoutes from './router/products.router';

export const app: express.Application = express();

app.use(express.json());
Mongo.connect();

app.use('/api', productRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello world');
});

app.use(function (error: { message: any }, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({ message: error.message });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
        console.log(`server listening on port ${process.env.PORT} `);
    });
}
