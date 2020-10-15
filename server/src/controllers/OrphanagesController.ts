import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as Yup from 'yup';

import Orphanage from '../database/entities/Orphanage';
import orphanages_view from '../views/orphanages_view';

class OrphanagesController {
  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(orphanages_view.render(orphanage));
  }

  public async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });

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

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => ({
      path: image.filename,
    }));

    const data = {
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      about: Yup.string().required().max(300),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, { abortEarly: false });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  }
}

export default OrphanagesController;
