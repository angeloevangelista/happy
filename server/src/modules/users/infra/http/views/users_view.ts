import User from '../../typeorm/entities/User';

export interface IUserView {
  id: number;
  name: string;
  email: string;
}

export default {
  render(user: User): IUserView {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};
