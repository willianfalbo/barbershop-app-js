import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import AppointmentController from './app/controllers/AppointmentController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// routes without authentication
routes.post('/users', UserController.create);

routes.post('/auth/login', AuthController.login);

// the routes bellow will use authentication
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.list);

routes.get('/schedule', ScheduleController.list);

routes.get('/appointments', AppointmentController.list);
routes.post('/appointments', AppointmentController.create);

export default routes;
