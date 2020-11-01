import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

@injectable()
class ListOrphanagesByUserService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: number): Promise<Orphanage[]> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User not found');
    }

    const orphanages = await this.orphanagesRepository.findByUser(user_id);

    return orphanages;
  }
}

export default ListOrphanagesByUserService;
