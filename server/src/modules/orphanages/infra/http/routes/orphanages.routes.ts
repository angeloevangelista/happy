import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '@config/upload';
import OrphanagesController from '@modules/orphanages/infra/http/controllers/OrphanagesController';

const orphanagesRouter = Router();
const upload = multer(uploadConfig);
const orphanagesController = new OrphanagesController();

orphanagesRouter.get('/', orphanagesController.index);
orphanagesRouter.get('/:id', orphanagesController.show);
orphanagesRouter.post('/', upload.array('images'), orphanagesController.create);

export default orphanagesRouter;