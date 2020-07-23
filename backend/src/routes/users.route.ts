import { Router } from 'express';
import CreateUserService from '../services/create-user.service';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const service = new CreateUserService();

    const user = await service.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
