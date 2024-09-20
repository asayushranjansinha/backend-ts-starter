import { Request, Response } from 'express';
import Config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import { HttpResponse } from '../types';

/**
 * Handles the HTTP response by constructing a standardized response object and sending it back to the client.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {number} responseStatusCode - The status code to be sent in the response.
 * @param {string} responseMessage - The message to be included in the response.
 * @param {unknown} [data=null] - Optional data to be included in the response.
 */
export default (
  req: Request,
  res: Response,
  responseStatusCode: number,
  responseMessage: string,
  data: unknown = null
) => {
  const response: HttpResponse = {
    statusCode: responseStatusCode,
    success: true,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl
    },
    message: responseMessage,
    data
  };

  // Remove sensitive information on Production
  if (Config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete response.request.ip;
  }

  res.status(responseStatusCode).json(response);
};
