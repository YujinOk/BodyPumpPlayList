import type { Middleware } from 'koa';
import HttpStatusCodes from 'http-status-codes';

const isObject = (value: unknown): value is Record<PropertyKey, unknown> =>
  typeof value === 'object' && value !== null;

function createErrorMiddleware(): Middleware {
  return async (ctx, next): Promise<void> => {
    try {
      await next();
    } catch (err: unknown) {
      if (!isObject(err) || typeof err.status !== 'number') {
        ctx.status = 500;
        ctx.body = '';
        return;
      }

      ctx.status = err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = err.message || '';
    }
  };
}

export default createErrorMiddleware;
