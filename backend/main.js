import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import traitsRouter from './routes/traits.js';
import productsRouter from './routes/products.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/traits', traitsRouter);
app.use('/products', productsRouter);

app.listen(8000);

