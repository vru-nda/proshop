import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import {notFound, internalError} from './middleware/errorMiddleware.js';

dotenv.config();

connectDb();

const app = express();

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(internalError);

const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
      .bold
  )
);
