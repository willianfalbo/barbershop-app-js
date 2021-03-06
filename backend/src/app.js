import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import routes from './routes';
import { config } from './config';
import sentryConfig from './config/sentry';
import rateLimitConfig from './config/rate-limit';
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

    // cors
    this.server.use(
      cors({
        origin: config.frontendUrl,
      })
    );

    this.server.use(helmet());

    // to enable json on body requests
    this.server.use(express.json());

    // to serve static files
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp'))
    );

    // rate limit access
    if (config.environment !== 'development') {
      this.server.use(rateLimitConfig);
    }
  }

  routes() {
    this.server.use(routes);
    // sentry error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const message = err.message || 'Internal server error';
      const statusCode = err.statusCode || 500;
      console.error(err.stack);
      return res.status(statusCode).json({ message, statusCode });
    });
  }
}

export default new App().server;
