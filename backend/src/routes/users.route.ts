import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/create-user.service';
import jwtAuth from '../middlewares/jwt-auth.middleware';
import uploadConfig from '../config/upload.config';
import UpdateUserAvatarService from '../services/update-user-avatar.service';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const service = new CreateUserService();
    const user = await service.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.patch('/avatar', jwtAuth, upload.single('file'), async (req, res) => {
  try {
    const service = new UpdateUserAvatarService();
    const user = await service.execute({
      userId: req.userId,
      avatarUri: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
