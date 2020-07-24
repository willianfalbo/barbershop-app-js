import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/user.model';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const repository = getRepository(User);

    const user = await repository.findOne({ where: { email } });
    if (!user) {
      throw Error('Invalid credentials');
    }

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      throw Error('Invalid credentials');
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { user, token };
  }
}

export default AuthUserService;
