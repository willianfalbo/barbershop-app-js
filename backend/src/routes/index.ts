import { Router } from 'express';
import appointmentsRoute from './appoinments.route';
import usersRoute from './users.route';

const routes = Router();

routes.use('/appointments', appointmentsRoute);
routes.use('/users', usersRoute);

export default routes;
