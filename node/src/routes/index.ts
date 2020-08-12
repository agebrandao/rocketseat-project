import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

//Use: Toda rota que comece com appointments independente de get, post...
routes.use('/appointments', appointmentsRouter);

export default routes;