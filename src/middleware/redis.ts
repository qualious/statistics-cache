import redis from 'redis';
import { promisify } from 'util';
import logger from '../logger';

const client = redis.createClient();

client.on('connect', () => logger.debug('⌗  Redis client connected'));

client.on('error', error => logger.error(error));

// HACK: Node Redis currently doesn't natively support promises (this is coming in v4)
export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);

// export const getList = promisify(client.lrange).bind(client);
// NOTE: This is a future alternative as  an example
// if we want further adjustments and before/after
// operations before redis
// const getList = async key => {
//   return new Promise(resolve => {
//     client.lrange(key, 0, -1, (err, res) => {
//       if (err) console.error(err);
//       resolve(res);
//     });
//   });
// };
