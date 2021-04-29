import express from 'express';
import morgan from 'morgan';

const app = express();


import tablesRoutes from './routes/tables.routes';
import authRoutes from './routes/auth.routes';



app.use(morgan('dev'));
app.use(express.json());


app.use('/api/tables', tablesRoutes);
app.use('/api/auth', authRoutes);


export default app;




