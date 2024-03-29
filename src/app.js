import regeneratorRuntime from "regenerator-runtime/runtime";
import express from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express();

//  MIDDLEWARE CORS - enable CORS without external module
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

import authRoutes from './routes/auth.routes';

import tablesRoutes from './routes/tables.routes';
import productRoutes from './routes/products.routes';
import categoryRoutes from './routes/categories.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import paymentRoutes from './routes/payment.routes';
import statisticsRoutes from './routes/statistics.routes';

import imageRoutes from './routes/image.routes';



app.use(morgan('dev'));
app.use(express.json());

app.use('/api/table', tablesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);
app.use('/api/upload', imageRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment/', paymentRoutes);
app.use('/api/statistics', statisticsRoutes);


// Static files
app.use('/public', express.static( path.join(__dirname, '../public')));

export default app;