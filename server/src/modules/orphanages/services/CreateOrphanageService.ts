import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {
  about: string;
  images: Array<{ path: string }>;
  instructions: string;
  latitude: number;
  longitude: number;
  name: string;
  open_on_weekends: boolean;
  opening_hours: string;
}

@injectable()
class CreateOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Orphanage> {
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
