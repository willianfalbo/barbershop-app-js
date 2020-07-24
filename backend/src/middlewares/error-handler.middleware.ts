import { Request, Response, NextFunction } from 'express';
import AppError from '../models/support/app-error.model';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
}

export default errorHandler;
