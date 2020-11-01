import bcrypt from 'bcrypt';

import User from '@modules/users/infra/typeorm/entities/User';

type TGetUsersSeedsResponse = Promise<Omit<User, 'id'>[]>;

const getUsersSeeds = async (): TGetUsersSeedsResponse => {
  const users: Omit<User, 'id'>[] = [
    {
      name: 'Angelo',
      email: 'angeloevan.ane@gmail.com',
      password: await bcrypt.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
      orphanages: [],
    },
  ];

  return users;
};

export { TGetUsersSeedsResponse };
export default getUsersSeeds;
