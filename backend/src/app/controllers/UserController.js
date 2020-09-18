import User from '../models/User';
import File from '../models/File';
import { BadRequestException, NotFoundException } from '../errors';

class UserController {
  async create(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      throw new BadRequestException('User already exists.');
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const { email, oldPassword, avatarId } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        throw new BadRequestException('The e-mail address is already in use');
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new BadRequestException('Current password does not match');
    }

    if (avatarId) {
      const file = await File.findByPk(avatarId);
      if (!file) {
        throw new NotFoundException('Avatar ID was not found');
      }
    }

    await user.update({
      ...req.body,
      avatar_id: avatarId,
    });

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    return res.json({ id, name, email, avatar });
  }
}

export default new UserController();
