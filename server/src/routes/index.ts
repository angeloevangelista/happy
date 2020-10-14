import { Router } from 'express';

import orphanagesRouter from './orphanages.routes';

const routes = Router();

routes.use('/orphanages', orphanagesRouter);

routes.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default routes;
