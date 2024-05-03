import { Hono } from 'hono';
import { Env } from '../index';
import { getCableModems } from './modems.controller';

const modemsApp = new Hono<{Bindings: Env}>().basePath('/cableModems');

modemsApp.get('/', async (_, next) => {
  console.log('This is a middleware')
  await next();
}, async (c) => {
  const response = await getCableModems(c.env.DATABASE_URL);
  
  // const client = new Client(c.env.DATABASE_URL);
	// const response = await client.db.select().from(modems);

  return c.json(response);
});

export default modemsApp;