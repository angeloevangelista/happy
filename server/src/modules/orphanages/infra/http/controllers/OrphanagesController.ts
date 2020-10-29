import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import orphanages_view from '@modules/orphanages/infra/http/views/orphanages_view';

import FindOrphanageService from '@modules/orphanages/services/FindOrphanageService';
import ListOrphanagesService from '@modules/orphanages/services/ListOrphanagesService';
import CreateOrphanageService from '@modules/orphanages/services/CreateOrphanageService';

class OrphanagesController {
  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const findOrphanage = container.resolve(FindOrphanageService);

    const orphanage = await findOrphanage.execute(Number(id));

    if (!orphanage) {
      return response.status(401).json({
        error: 'Orphanage not found',
      });
    }

    return response.json(orphanages_view.render(orphanage));
  }

  public async index(request: Request, response: Response) {
    const listOrphanages = container.resolve(ListOrphanagesService);

    const orphanages = await listOrphanages.execute();

    return response.json(orphanages_view.renderMany(orphanages));
  }

  public async create(request: Request, response: Response) {
    const {
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => ({
      path: image.filename,
    }));

    const data: ICreateOrphanageDTO = {
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    const createOrphanage = container.resolve(CreateOrphanageService);

    const orphanage = await createOrphanage.execute(data);

    return response.status(201).json(orphanage);
  }
}

export default OrphanagesController;
