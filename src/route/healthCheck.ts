import { Router } from 'express';
import { HealthCheck } from '../controller/apiController';

const healthCheck = Router();

healthCheck.get('/health-check', HealthCheck);
export default healthCheck;
