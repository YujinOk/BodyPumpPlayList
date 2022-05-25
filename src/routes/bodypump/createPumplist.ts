import type Koa from 'koa';
import HttpStatusCodes from 'http-status-codes';
import { safeParse } from '../../parsers';

import { DataSource, BodyPump } from '../../types';

export const createPostPumplistHandler =
  (dataSource: DataSource) => async (ctx: Koa.Context) => {
    const parsedPumpList = safeParse(ctx.request.body, BodyPump);

    if (!!!parsedPumpList.success) {
      ctx.throw(
        HttpStatusCodes.BAD_REQUEST,
        `Validation failed: ${JSON.stringify(parsedPumpList?.)}`
      );
    }
    const pumpResult = await dataSource.createPlayList(parsedPumpList.value);

    ctx.res.statusCode = HttpStatusCodes.CREATED;
    ctx.body = {
      id: pumpResult.id,
    };
  };
