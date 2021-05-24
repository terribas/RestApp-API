import regeneratorRuntime from "regenerator-runtime/runtime";
import express from 'express';
import morgan from 'morgan';

const app = express();


import authRoutes from './routes/auth.routes';

import tablesRoutes from './routes/tables.routes';
import productRoutes from './routes/products.routes';
import categoryRoutes from './routes/categories.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import paymentRoutes from './routes/payment.routes';


app.use(morgan('dev'));
app.use(express.json());


app.use('/api/table', tablesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment/', paymentRoutes)


export default app;



/* todo

- validación formularios (email es válido?)
- pedidos favoritos
- contador minutos pedidos hasta que sean despachados (solo mostrados en ordenes por hacer) Hacer en cliente con JS

*/

