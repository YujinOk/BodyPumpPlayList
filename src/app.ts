import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-pino-logger';

import * as routes from './routes';
import createDataSource from './dataSource/createDataSource';

import config from './config';
import createErrorMiddleware from './errorMiddleware/errorMiddleware';
import HttpStatusCodes from 'http-status-codes';

const pinoLogger = logger({
  name: config.name,
  level: config.logLevel,
});

const app = new Koa();
app.use(cors());
const router = new Router();
const dataSource = createDataSource(config);

router.post('pump_list', '/pumplist', routes.createPumpList(dataSource));
