import express, { Application, Request, Response } from 'express';
import path from 'path';
import ResponseMessages from './constant/responseMessage';
import { ResponseStatusCode } from './constant/responseStatusCode';
import morganMiddleware from './middleware/morgan';
import apiRoute from './route/apiRoute';
import httpError from './util/httpError';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(morganMiddleware);

// Routes
app.use('/', apiRoute);

// 404/Not Found
app.use((req: Request, res: Response) => {
  const error = new Error(
    ResponseMessages.CUSTOM_ERROR('Api Endpoint not found')
  );
  return httpError(error, req, res, ResponseStatusCode.NOT_FOUND);
});

export default app;
