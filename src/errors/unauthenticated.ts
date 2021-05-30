import ApplicationError from './application-error';

export default class Unauthenticated extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Unauthenticated', 401);
  }
}
