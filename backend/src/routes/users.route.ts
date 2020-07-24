import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/create-user.service';
import jwtAuth from '../middlewares/jwt-auth.middleware';
import uploadConfig from '../config/upload.config';
import UpdateUserAvatarService from '../services/update-user-avatar.service';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const service = new CreateUserService();
  const user = await service.execute({ name, email, password });
  delete user.password;
  return res.json(user);
});

router.patch('/avatar', jwtAuth, upload.single('file'), async (req, res) => {
  const service = new UpdateUserAvatarService();
  const user = await service.execute({
    userId: req.userId,
    avatarFilename: req.file.filename,
  });
  delete user.password;
  return res.json(user);
});

export default router;
