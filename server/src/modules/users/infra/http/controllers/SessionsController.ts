import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../../../services/AuthenticateUserService';
import sessions_view from '../views/sessions_view';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { token, user } = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(201).json(sessions_view.render({ token, user }));
  }
}

export default SessionsController;
