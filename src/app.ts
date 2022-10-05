import 'dotenv/config';
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import Mongo from './models/schema';

// const connect = require('./schema');
import productRoutes from './router/products.router';

export const app: express.Application = express();

async function start() {
    app.use(express.json());
    await Mongo.connect();

    app.use('/api', productRoutes);

    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('hello world');
    });

    app.use(function (error: { message: any }, req: Request, res: Response, next: NextFunction) {
        res.status(500).json({ message: error.message });
    });

    app.listen(80, () => {
        console.log(`server listening on port ${process.env.PORT} `);
    });
}

start();
