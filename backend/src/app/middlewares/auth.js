import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import { UnauthorizedException } from '../errors';

export default async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new UnauthorizedException('Token not provided');
  }

  // to destructure the array skipping the first value
  const [, token] = bearerToken.split(' ');

  try {
    // using promisify to transform "callbacks" in "promisses" so we will be able to use await instead
    const decodedToken = await promisify(jwt.verify)(token, authConfig.secret);

    // to assign userId for authorized requests
    req.userId = decodedToken.id;

    return next();
  } catch (error) {
    throw new UnauthorizedException('Invalid token');
  }
};
