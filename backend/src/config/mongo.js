import 'dotenv/config';
import { checkConfig } from '.';

export default {
  uri: checkConfig(process.env.MONGO_URI),
  options: {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
};
