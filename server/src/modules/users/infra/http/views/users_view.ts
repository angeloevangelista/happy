import User from '../../typeorm/entities/User';

interface IUserView {
  id: string;
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
