import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  sub: string;
}

function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret) as ITokenPayload;

    request.user = {
      id: decoded.sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT.');
  }
}

export default ensureAuthenticate;
