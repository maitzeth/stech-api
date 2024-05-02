import { Hono } from 'hono';
import { modems } from './db/schema';
import { Client } from './db';

export type Env = {
  DATABASE_URL: string;
}

const app = new Hono<{Bindings: Env}>();

app.get('/', async (c) => {
	const client = new Client(c.env.DATABASE_URL);
	const response = await client.db.select().from(modems);
	
	console.log(response);
  // // const allProducts = await db.select().from(products);
  return c.json({ hello: 'world' });
});

export default app;