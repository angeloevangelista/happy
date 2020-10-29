import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO';

interface IFindOptions {
  relations?: string[];
}

interface IOrphanagesRepository {
  findById(id: number): Promise<Orphanage | undefined>;
  find(): Promise<Orphanage[]>;
  create(data: ICreateOrphanageDTO): Promise<Orphanage>;
}

export { IFindOptions, IOrphanagesRepository };
export default IOrphanagesRepository;
