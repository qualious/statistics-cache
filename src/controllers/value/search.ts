import { Response, Request, RequestHandler } from 'express';
// import Joi from 'joi';
import Value, { IValue } from '../../models/Value';
import requestMiddleware from '../../middleware/request-middleware';
import { buildSearchQuery } from '../utils/search';
import { searchSchema } from './schemata';

const search: RequestHandler = async (
  req: Request<{}, {}, {}, Partial<Omit<IValue, 'data'>>>,
  res: Response,
) => {
  const query: Record<keyof Partial<IValue>, any> = buildSearchQuery<IValue>(req.query);
  const values = await Value.find(query as any);
  res.send({ values });
};

export default requestMiddleware(search, {
  validation: { query: searchSchema },
});
