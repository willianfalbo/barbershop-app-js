import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(3)
        .max(20),
      email: Yup.string()
        .required()
        .email(),
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

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Schema validation failed', messages: err.inner });
  }
};
