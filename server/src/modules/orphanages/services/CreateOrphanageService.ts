import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';
import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO';

@injectable()
class CreateOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreateOrphanageDTO): Promise<Orphanage> {
    const schema = Yup.object().shape({
      user_id: Yup.number().required('User_id is required'),
      name: Yup.string().required('Name is required'),
      about: Yup.string().required('About is required').max(300),
      latitude: Yup.number().required('Latitude is required'),
      longitude: Yup.number().required('Longitude is required'),
      instructions: Yup.string().required('Instructions is required'),
      opening_hours: Yup.string().required('Opening_hours is required'),
      open_on_weekends: Yup.boolean().required('Open_on_weekends is required'),
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
      user_id,
    } = data;

    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User not found.');
    }

    const orphanage = await this.orphanagesRepository.create({
      about,
      images,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
      user: findUser,
    });

    return orphanage;
  }
}

export default CreateOrphanageService;
