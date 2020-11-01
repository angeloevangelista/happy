import User from '../../typeorm/entities/User';

export interface IUserView {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export default {
  render(user: User): IUserView {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  },
};
