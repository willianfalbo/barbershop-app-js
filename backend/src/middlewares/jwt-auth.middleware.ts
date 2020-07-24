import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth.config';
import AppError from '../models/support/app-error.model';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function jwtAuth(req: Request, res: Response, next: NextFunction): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('Missing JWT Token', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = verify(token, authConfig.secret);
    const { sub } = decodedToken as TokenPayload;

    req.userId = sub;

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

export default jwtAuth;
