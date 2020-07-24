import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/user.model';
import uploadConfig from '../config/upload.config';
import AppError from '../models/support/app-error.model';

interface Request {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const repository = getRepository(User);

    const user = await repository.findOne(userId);
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.avatarFilename) {
      const avatarUri = path.join(uploadConfig.directory, user.avatarFilename);
      const avatarFileExists = await fs.promises.stat(avatarUri);

      if (avatarFileExists) {
        await fs.promises.unlink(avatarUri);
      }
    }

    user.avatarFilename = avatarFilename;
    await repository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
