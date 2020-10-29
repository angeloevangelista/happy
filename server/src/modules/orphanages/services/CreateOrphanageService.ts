import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';

import Image from '@modules/orphanages/infra/typeorm/entities/Image';
import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';
import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO';

// import AppError from '@shared/errors/AppError'; => to implement

@injectable()
class CreateOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  public async execute(data: ICreateOrphanageDTO): Promise<Orphanage> {
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

    const {
      about,
      images,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
    } = data;

    const orphanage = await this.orphanagesRepository.create({
      about,
      images,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
    });

    return orphanage;
  }
}

export default CreateOrphanageService;
