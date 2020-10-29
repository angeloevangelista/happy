import { container } from 'tsyringe';

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import OrphanagesRepository from '@modules/orphanages/infra/typeorm/repositories/OrphanageRepository';

container.registerSingleton<IOrphanagesRepository>(
  'OrphanagesRepository',
  OrphanagesRepository,
);
