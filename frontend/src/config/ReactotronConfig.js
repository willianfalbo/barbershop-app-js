import Reactotron from 'reactotron-react-js';

import * as config from '.';

if (config.NODE_ENV === 'development') {
  const tron = Reactotron.configure().connect();

  tron.clear();

  console.tron = tron;
}
