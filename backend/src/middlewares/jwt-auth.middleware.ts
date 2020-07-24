import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth.config';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function jwtAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error('Missing JWT Token');
  }

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = verify(token, authConfig.secret);
    const { sub } = decodedToken as TokenPayload;

    req.userId = sub;

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
