import Joi from 'joi';
import { RequestHandler, Request, Response, NextFunction } from 'express';

import logger from '../logger';
import { BadRequest, Unauthenticated } from '../errors';
import { authenticate } from './authentication'

const getMessageFromJoiError = (
  error: Joi.ValidationError,
): string | undefined => {
  if (!error.details && error.message) {
    return error.message;
  }
  return error.details && error.details.length > 0 && error.details[0].message
    ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}`
    : undefined;
};

interface HandlerOptions {
  validation?: {
    query?: Joi.ObjectSchema | Joi.AlternativesSchema;
    body?: Joi.ObjectSchema | Joi.AlternativesSchema;
  };
}

export const requestMiddleware = (
  handler: RequestHandler,
  options?: HandlerOptions,
): RequestHandler => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (options?.validation?.body) {
    const { error } = options?.validation?.body.validate(req.body);
    if (error != null) {
      next(new BadRequest(getMessageFromJoiError(error)));
      return;
    }
  }

  if (options?.validation?.query) {
    const { error } = options?.validation?.query.validate(req.query);
    if (error != null) {
      next(new BadRequest(getMessageFromJoiError(error)));
      return;
    }
  }

  try {
    const hasAccess = await authenticate(req.get('X-USER-INFO'))
    if (!hasAccess) throw new Unauthenticated();
    handler(req, res, null);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      logger.log({
        level: 'error',
        message: 'Error in request handler',
        error: err,
      });
    }
    next(err);
  }
};

export default requestMiddleware;
