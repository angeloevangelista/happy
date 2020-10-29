import { Router } from 'express';

import orphanagesRouter from '@modules/orphanages/infra/http/routes/orphanages.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/orphanages', orphanagesRouter);
routes.use('/users', usersRouter);

routes.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default routes;
