import { Hono } from 'hono';
import { Env } from '../index';
import { getCableModems, createCableModem } from './modems.controller';
import { withErrorHandling } from '../utils/error';
import { ModemRequest } from '../types/modems';
import { validatePayload, validateDateTime } from './modems.validate';

const modemsApp = new Hono<{Bindings: Env}>().basePath('/cableModems');

modemsApp.get('/', withErrorHandling(async (c) => {
  const response = await getCableModems(c.env.DATABASE_URL);
  return c.json(response, 200);
}));

modemsApp.post('/', validatePayload, validateDateTime, withErrorHandling(async (c) => {
  const body = await c.req.json() as ModemRequest;
  const response = await createCableModem(c.env.DATABASE_URL, body);
  return c.json(response, 201);
}));

export default modemsApp;