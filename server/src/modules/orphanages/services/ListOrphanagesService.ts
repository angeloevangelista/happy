import { inject, injectable } from 'tsyringe';

import Orphanage from "../infra/typeorm/entities/Orphanage";
import IOrphanagesRepository from "../repositories/IOrphanagesRepository";

@injectable()
class ListOrphanagesService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository
  ) {}

  public async execute(): Promise<Orphanage[]> {
    const orphanages = this.orphanagesRepository.find();

    return orphanages;
  }
}

export default ListOrphanagesService;