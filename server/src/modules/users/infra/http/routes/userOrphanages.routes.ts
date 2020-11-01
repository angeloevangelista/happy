import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';

import UserOrphanagesController from '../controllers/UserOrphanagesController';

const userOrphanagesRouter = Router();
const userOrphanagesController = new UserOrphanagesController();

userOrphanagesRouter.get(
  '/',
  ensureAuthenticate,
  userOrphanagesController.index,
);

export default userOrphanagesRouter;
