import express from 'express';
import morgan from 'morgan';

const app = express();


import authRoutes from './routes/auth.routes';

import tablesRoutes from './routes/tables.routes';
import productRoutes from './routes/products.routes';
import categoryRoutes from './routes/categories.routes';
import userRoutes from './routes/user.routes';



app.use(morgan('dev'));
app.use(express.json());


app.use('/api/tables', tablesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);


export default app;



/* todo

- validación formularios (email es válido?)
- pedidos favoritos

*/

