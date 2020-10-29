import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .required('Email is required')
        .email('Use a valid email address'),
      password: Yup.string().min(
        6,
        'Password must contains at least 6 characters',
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const { name, email, password } = data;

    const findUser = await this.usersRepository.findByEmail(email);

    if (findUser) {
      throw new AppError('Email address already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
