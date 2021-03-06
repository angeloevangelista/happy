import path from 'path';
import cors from 'cors';
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import errorHandler from '@shared/errors/handler';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => console.log('Server is running'));
