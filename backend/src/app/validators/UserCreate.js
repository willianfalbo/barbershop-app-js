import * as Yup from 'yup';
import { BadRequestException } from '../errors';

export default async (req, res, next) => {
  try {
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

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    throw new BadRequestException(err.errors);
  }
};
