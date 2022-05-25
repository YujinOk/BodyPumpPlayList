import type { Server } from 'http';

import Router from '@koa/router';
import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import supertest from 'supertest';

import createErrorMiddleware from './errorMiddleware';

describe.skip('errorMiddleware', () => {
  let request: any;
  let server: Server;

  const emitSpy = jest.fn();

  beforeAll(() => {
    const app = new Koa();
    const router = new Router();

    router
      .get('/', (ctx: Context) => {
        ctx.status = 200;
      })
      .post('/error', (ctx: Context) => {
        throw ctx.request.body;
      });

    app.use(bodyParser());
    app.use(createErrorMiddleware());
    app.use(router.middleware());
    app.on('error', emitSpy);
    server = app.listen();
    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    emitSpy.mockReset();
  });

  describe('When exception is thrown', () => {
    it('should handle error as 500 and emit error', async () => {
      const response = await request
        .post('/error')
        .send(new Error('Some catastrophic failure'));

      expect(emitSpy).toHaveBeenCalled();
      expect(response.error).toEqual(
        expect.objectContaining({ status: 500, text: '' }),
      );
    });
  });

  describe('When network error is thrown', () => {
    it.each`
      error                                                     | status | text
      ${{ status: 500, message: 'Internal Server Error' }}      | ${500} | ${''}
      ${{ status: 504, message: 'Bad Gateway' }}                | ${504} | ${''}
      ${{ response: { status: 401, message: 'Unauthorised' } }} | ${401} | ${'Unauthorised'}
      ${{ status: 401, message: 'Unauthorised' }}               | ${401} | ${'Unauthorised'}
      ${{ statusCode: 401, message: 'Unauthorised' }}           | ${401} | ${'Unauthorised'}
    `(
      'should transform $error to desired response and return $status and $text',
      async ({ error, status, text }) => {
        const response = await request.post('/error').send(error);

        expect(emitSpy).toHaveBeenCalledWith(error, expect.any(Object));
        expect(response.status).toEqual(status);
        expect(response.text).toEqual(text);
      },
    );
  });

  it('should ensure all valid requests and handled', async () => {
    const response = await request.get('/');

    expect(response.status).toEqual(200);
  });
});
