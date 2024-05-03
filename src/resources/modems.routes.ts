import { Hono } from 'hono';
import { Env } from '../index';
import { getCableModems } from './modems.controller';
import { withErrorHandling } from '../utils/error';

const modemsApp = new Hono<{Bindings: Env}>().basePath('/cableModems');

modemsApp.get('/', withErrorHandling(async (c) => {
  const response = await getCableModems(c.env.DATABASE_URL);
  return c.json(response, 200);
}));

export default modemsApp;