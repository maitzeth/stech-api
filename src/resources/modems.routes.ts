import { Hono } from 'hono';
import { Env } from '../index';
import {
  getCableModems,
  createCableModem,
  getCableModemById,
  updateCableModem,
  deleteCableModem
} from './modems.controller';
import { withErrorHandling } from '../utils/error';
import { ModemRequest } from '../types/modems';
import { validatePayload, validateDateTime } from './modems.validate';

const modemsApp = new Hono<{Bindings: Env}>().basePath('/cableModems');

// :GET
modemsApp.get('/', withErrorHandling(async (c) => {
  const querySearch = c.req.query() as { q: string } | undefined; 

  const response = await getCableModems(c.env.DATABASE_URL, querySearch?.q);
  return c.json(response, 200);
}));

// :POST
modemsApp.post('/', validatePayload, validateDateTime, withErrorHandling(async (c) => {
  const body = await c.req.json() as ModemRequest;
  const response = await createCableModem(c.env.DATABASE_URL, body);
  return c.json(response, 201);
}));

// :GET /:id
modemsApp.get('/:id', withErrorHandling(async (c) => {
  const param = c.req.param() as { id: string };
  const response = await getCableModemById(c.env.DATABASE_URL, param.id)
  return c.json(response);
}));

// :PUT
modemsApp.put('/:id', validatePayload, validateDateTime, withErrorHandling(async (c) => {
  const body = await c.req.json() as ModemRequest;
  const param = c.req.param() as { id: string };
  const response = await updateCableModem(c.env.DATABASE_URL, param.id, body);
  return c.json(response, 201);
}));

modemsApp.delete('/:id', withErrorHandling(async (c) => {
  const param = c.req.param() as { id: string };
  await deleteCableModem(c.env.DATABASE_URL, param.id);
  return new Response(null, { status: 204 });
}));

export default modemsApp;