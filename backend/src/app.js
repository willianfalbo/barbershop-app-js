import express from 'express';
import 'express-async-errors';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import routes from './routes';
import sentryConfig from './config/sentry';
import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // sentry request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());

    // to enable json on body requests
    this.server.use(express.json());

    // to serve static files
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp'))
    );
  }

  routes() {
    this.server.use(routes);
    // sentry error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // Youch is a pretty error reporting
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

export default new App().server;
