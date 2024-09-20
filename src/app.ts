import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import path from 'path';
import ResponseMessages from './constant/responseMessage';
import { ResponseStatusCode } from './constant/responseStatusCode';
import morganMiddleware from './middleware/morgan';
import healthCheck from './route/healthCheck';
import httpError from './util/httpError';
import rateLimiterMiddleware from './middleware/rateLimiter';

const app: Application = express();

// Middlewares
app.use(helmet());

 
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(morganMiddleware);
app.use(rateLimiterMiddleware)

// Routes
app.use('/api/v1', healthCheck);

// 404/Not Found
app.use((req: Request, res: Response) => {
  const error = new Error(
    ResponseMessages.CUSTOM_ERROR('Api Endpoint not found')
  );
  return httpError(error, req, res, ResponseStatusCode.NOT_FOUND);
});

export default app;
