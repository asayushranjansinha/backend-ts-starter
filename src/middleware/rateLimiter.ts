import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import Config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import httpError from '../util/httpError';
import ResponseMessages from '../constant/responseMessage';
import { ResponseStatusCode } from '../constant/responseStatusCode';

// Create a rate limiter instance
const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of points
  duration: 60 // Per 60 seconds
});

// Middleware to apply rate limiting
const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return next();
  }
  rateLimiter
    .consume(req.ip as string)
    .then(() => {
      next();
    })
    .catch(() => {
      httpError(
        new Error(ResponseMessages.TOO_MANY_REQUEST),
        req,
        res,
        ResponseStatusCode.TOO_MANY_REQUEST
      );
    });
};
export default rateLimiterMiddleware;
