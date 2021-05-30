import { get, set } from './redis';


// TODO: Encrypt?
export const authenticate = async (userId: string): Promise<boolean> => {
  const allowed: string | undefined = await get(userId);
  if (allowed === undefined || allowed === null) {
    setTimeout(() => {
      // TODO: Ask AS for authentication based on the
      // information we have. Probably JWT but we'll see.
      const _allowed: string = 'true';
      if (_allowed == 'false') return false;
      set(userId, _allowed);
    }, 500);
  }
  if (allowed == 'false') {
    return false;
  }
  return true;
};
