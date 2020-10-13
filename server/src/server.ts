import 'reflect-metadata';
import express, { request } from 'express';

import './database/connection';

const app = express();

app.get('/', (request, response) => {
  return response.json({ ok: true });
});

app.listen(process.env.PORT || 3333);
