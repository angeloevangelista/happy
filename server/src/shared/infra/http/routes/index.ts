import { Router } from 'express';

import orphanagesRouter from '@modules/orphanages/infra/http/routes/orphanages.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import userOrphanagesRouter from '@modules/users/infra/http/routes/userOrphanages.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/orphanages', orphanagesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users/orphanages', userOrphanagesRouter);
routes.use('/users', usersRouter);

routes.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default routes;
