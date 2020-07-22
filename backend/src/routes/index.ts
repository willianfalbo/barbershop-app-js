import { Router } from 'express';
import router from './appoinments.route';

const routes = Router();

routes.use('/appointments', router);

export default routes;
