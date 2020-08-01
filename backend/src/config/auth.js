import 'dotenv/config';
import { checkConfig } from '.';

export default {
  secret: checkConfig(process.env.APP_SECRET),
  expiresIn: '7d',
};
