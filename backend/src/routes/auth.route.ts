import { Router } from 'express';
import AuthUserService from '../services/auth-user.service';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const service = new AuthUserService();
    const { user, token } = await service.execute({ email, password });

    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
