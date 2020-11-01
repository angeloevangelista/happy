import users_view, { IUserView } from './users_view';
import User from '../../typeorm/entities/User';

interface ISessionViewData {
  token: string;
  user: User;
}

interface ISessionView {
  token: string;
  user: IUserView;
}

export default {
  render({ token, user }: ISessionViewData): ISessionView {
    return {
      token,
      user: users_view.render(user),
    };
  },
};
