import { Request, Response } from 'express';
import ResponseMessages from '../constant/responseMessage';
import { ResponseStatusCode } from '../constant/responseStatusCode';
import httpError from '../util/httpError';
import httpResponse from '../util/httpResponse';

export function CheckRoute(req: Request, res: Response) {
  try {
    return httpResponse(
      req,
      res,
      ResponseStatusCode.ACCEPTED,
      ResponseMessages.SUCCESS
    );
  } catch (error) {
    return httpError(error, req, res, ResponseStatusCode.INTERNAL_SERVER_ERROR);
  }
}
