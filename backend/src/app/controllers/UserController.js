import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(3)
        .max(20),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Schema validation failed' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .max(20),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        // password is required if oldPassword is being provided
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      passwordConfirmation: Yup.string()
        // passwordConfirmation must match with password
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      avatarId: Yup.number()
        .optional()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Schema validation failed' });
    }

    const { email, oldPassword, avatarId } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({
          error: `The e-mail address is already in use`,
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    if (avatarId) {
      const file = await File.findByPk(avatarId);
      if (!file) {
        return res.status(401).json({ error: 'Avatar ID was not found' });
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
