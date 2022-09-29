import express, { Request, Response, NextFunction } from 'express';
import Mongo from './schema';
import 'dotenv/config';

// const connect = require('./schema');
import productRoutes from './routes';

export const app = express();

app.use(express.json());
app.use('/api', productRoutes);
Mongo.connect();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello world');
});

app.use(function (error: { message: any }, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({ message: error.message });
});

app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT} `);
});
