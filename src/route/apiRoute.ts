import { Router } from 'express';
import { CheckRoute } from '../controller/apiController';

const apiRoute = Router();

apiRoute.get('/api/v1', CheckRoute);
export default apiRoute;
