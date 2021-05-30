import { LeanDocument } from 'mongoose';
import { Request, RequestHandler } from 'express';
import { BulkWriteOpResultObject } from 'mongodb';

import Value, { IValue } from '../../models/Value';
import requestMiddleware from '../../middleware/request-middleware';
import { addValueSchema } from './schemata';

interface Body extends IValue {
  action: string;
  bulk?: Array<IValue>;
}

const bulkAdd = async ({
  bulk,
}: Partial<Body>): Promise<BulkWriteOpResultObject> =>
  Value.bulkWrite(
    bulk.map(({ codename, entity, synced, info, value, data }) => ({
      updateOne: {
        filter: { codename, entity, info },
        update: { codename, entity, synced, info, value, data },
        upsert: true,
      },
    })),
  );

const add = async ({
  codename,
  entity,
  synced,
  info,
  value,
  data,
}: Partial<Body>): Promise<LeanDocument<IValue>> =>
  Value.findOneAndUpdate(
    { codename, entity, info },
    { codename, entity, synced, info, value, data },
    // TODO: returnOriginal: https://github.com/Automattic/mongoose/issues/10285
    { upsert: true, returnOriginal: false, rawResult: false },
  );

const handleRequest: RequestHandler = async (
  req: Request<{}, {}, Partial<Body>>,
  res,
) => {
  let data = {} as LeanDocument<IValue> | BulkWriteOpResultObject;
  const { action } = req.body;
  if (action === 'bulk') data = await bulkAdd(req.body);
  if (action === 'single') data = await add(req.body);
  res.send({ data });
};

export default requestMiddleware(handleRequest, {
  validation: { body: addValueSchema },
});
