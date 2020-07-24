import { Router } from 'express';
import AuthenticateUserService from '../services/auth-user.service';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const service = new AuthenticateUserService();
  const { user, token } = await service.execute({ email, password });
  delete user.password;
  return res.json({ user, token });
});

export default router;
