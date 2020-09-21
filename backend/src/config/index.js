import 'dotenv/config';

export function checkConfig(value) {
  if (!value) {
    throw Error('Make sure you have all keys set in your .env file');
  }
  return value;
}

export const config = {
  apiUrl: checkConfig(process.env.API_URL),
  frontendUrl: checkConfig(process.env.FRONTEND_URL),
  environment: checkConfig(process.env.NODE_ENV),
};
