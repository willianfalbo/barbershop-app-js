import * as Yup from 'yup';
import { BadRequestException } from '../errors';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      providerId: Yup.number().required(),
      date: Yup.date().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    throw new BadRequestException(err.errors);
  }
};
