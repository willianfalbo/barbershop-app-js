import 'dotenv/config';
import { checkConfig } from '.';

export default {
  host: checkConfig(process.env.MAIL_HOST),
  port: checkConfig(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: checkConfig(process.env.MAIL_USER),
    pass: checkConfig(process.env.MAIL_PASS),
  },
  default: {
    from: 'BarbershopJs Team <noreply@barbershopjs.com>',
  },
};
