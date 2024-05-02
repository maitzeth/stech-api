import { Hono } from 'hono';
import { Env } from '../index';

// import { modems } from './db/schema';
// import { Client } from './db';

const modemsApp = new Hono<{Bindings: Env}>().basePath('/cableModems');

modemsApp.get('/', async (c) => {
  // const client = new Client(c.env.DATABASE_URL);
	// const response = await client.db.select().from(modems);

  return c.json({ hello: 'world' });
});

export default modemsApp;