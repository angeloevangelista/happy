import User from '@modules/users/infra/typeorm/entities/User';
import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

interface ICreateOrphanageData {
  user: User;
  name: string;
  about: string;
  latitude: number;
  longitude: number;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    path: string;
  }[];
}

interface IFindOptions {
  relations?: string[];
}

interface IOrphanagesRepository {
  findById(id: number): Promise<Orphanage | undefined>;
  findByUser(user_id: number): Promise<Orphanage[]>;
  find(): Promise<Orphanage[]>;
  create(data: ICreateOrphanageData): Promise<Orphanage>;
}

export { IFindOptions, IOrphanagesRepository };
export default IOrphanagesRepository;
