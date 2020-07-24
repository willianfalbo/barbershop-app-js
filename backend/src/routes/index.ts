import { Router } from 'express';
import appointmentsRoute from './appointments.route';
import usersRoute from './users.route';
import authRoute from './auth.route';

const routes = Router();

routes.use('/appointments', appointmentsRoute);
routes.use('/users', usersRoute);
routes.use('/auth', authRoute);

export default routes;
