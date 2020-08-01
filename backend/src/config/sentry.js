import 'dotenv/config';
import { checkConfig } from '.';

export default {
  dsn: checkConfig(process.env.SENTRY_DSN),
};
