import { Request, Response } from 'express';
import ResponseMessages from '../constant/responseMessage';
import { ResponseStatusCode } from '../constant/responseStatusCode';
import httpError from '../util/httpError';
import httpResponse from '../util/httpResponse';
import {
  getApplicationHealthStatus,
  getSystemHealthStatus
} from '../util/util';

export function HealthCheck(req: Request, res: Response) {
  try {
    const healthStatus = {
      system: getSystemHealthStatus(),
      application: getApplicationHealthStatus(),
      timestamp: Date.now()
    };
    return httpResponse(
      req,
      res,
      ResponseStatusCode.OK,
      ResponseMessages.SUCCESS,
      healthStatus
    );
  } catch (error) {
    return httpError(error, req, res, ResponseStatusCode.INTERNAL_SERVER_ERROR);
  }
}
