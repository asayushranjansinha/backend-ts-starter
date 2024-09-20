import { Request, Response } from 'express';
import Config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import ResponseMessages from '../constant/responseMessage';
import { HttpError } from '../types';
import logger from './logger';

/**
 * Handles the HTTP error response by constructing a standardized error response object and sending it back to the client.
 *
 * @param {unknown} err - The error object or message.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {number} [errorStatusCode=500] - The HTTP status code to return. Defaults to 500.
 */
export default (
  err: unknown,
  req: Request,
  res: Response,
  errorStatusCode: number = 500
) => {
  const error: HttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl
    },
    message:
      err instanceof Error
        ? err.message || ResponseMessages.INTERNAL_SERVER_ERROR
        : ResponseMessages.INTERNAL_SERVER_ERROR,
    data: null,
    trace: err instanceof Error ? { error: err.stack } : null
  };

  // Log Error into file
  logger.error(error.message, {
    metadata: error
  });

  // Remove sensitive information in Production
  if (Config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete error.request.ip;
    delete error.trace;
  }

  res.status(errorStatusCode).json(error);
};
