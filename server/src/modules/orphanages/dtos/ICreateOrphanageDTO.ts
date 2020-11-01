import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateOrphanageDTO {
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
