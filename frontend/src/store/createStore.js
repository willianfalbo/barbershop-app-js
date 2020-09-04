import { createStore, compose, applyMiddleware } from 'redux';
import * as config from '../config';

export default (reducers, middlewares) => {
  const enhancer =
    config.NODE_ENV === 'development'
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
