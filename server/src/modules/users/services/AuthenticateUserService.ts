import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';

import authConfig from '@config/jwt';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Use a valid email address.')
        .required('Email is required'),
      password: Yup.string().required('Password is required.'),
    });

    await schema.validate(
      { email, password },
      {
        abortEarly: false,
      },
    );

    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('Invalid email/password combination.');
    }

    const passwordMatches = await bcrypt.compare(password, findUser.password);

    if (!passwordMatches) {
      throw new AppError('Invalid email/password combination.');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = jwt.sign({}, secret, {
      subject: String(findUser.id),
      expiresIn,
    });

    return {
      user: findUser,
      token,
    };
  }
}

export default AuthenticateUserService;
