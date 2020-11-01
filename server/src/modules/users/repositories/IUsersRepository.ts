import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(params: ICreateUserDTO): Promise<User>;
  findById(id: number): Promise<User | undefined>;
}

export default IUsersRepository;
