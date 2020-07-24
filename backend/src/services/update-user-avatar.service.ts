import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/user.model';
import uploadConfig from '../config/upload.config';

interface Request {
  userId: string;
  avatarUri: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarUri }: Request): Promise<User> {
    const repository = getRepository(User);

    const user = await repository.findOne(userId);
    if (!user) {
      throw Error('User does not exist.');
    }

    if (user.avatarUri) {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatarUri);
      const avatarFileExists = await fs.promises.stat(avatarFilePath);

      if (avatarFileExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatarUri = avatarUri;
    await repository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
