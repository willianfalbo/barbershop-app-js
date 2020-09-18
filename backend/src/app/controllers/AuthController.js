import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';
import File from '../models/File';
import { UnauthorizedException, NotFoundException } from '../errors';

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException('Password does not match');
    }

    const { id, name, provider, avatar } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new AuthController();
