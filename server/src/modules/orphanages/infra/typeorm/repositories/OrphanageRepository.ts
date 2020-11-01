import { getRepository, Repository } from 'typeorm';

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import Orphanage from '../entities/Orphanage';

class OrphanagesRepository implements IOrphanagesRepository {
  private ormRepository: Repository<Orphanage>;

  constructor() {
    this.ormRepository = getRepository(Orphanage);
  }

  async findByUser(user_id: number): Promise<Orphanage[]> {
    const orphanages = await this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['user', 'images'],
    });

    return orphanages;
  }

  public async findById(id: number): Promise<Orphanage | undefined> {
    const orphanage = await this.ormRepository.findOne(id, {
      relations: ['images'],
    });

    return orphanage;
  }

  public async find(): Promise<Orphanage[]> {
    const orphanages = await this.ormRepository.find({
      relations: ['images'],
    });

    return orphanages;
  }

  async create({
    about,
    images,
    instructions,
    latitude,
    longitude,
    name,
    open_on_weekends,
    opening_hours,
    user,
  }: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = this.ormRepository.create({
      about,
      images,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
      user,
    });

    await this.ormRepository.save(orphanage);

    return orphanage;
  }
}

export default OrphanagesRepository;
