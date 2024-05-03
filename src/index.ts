import { Hono } from 'hono';

import modemsRoutes from './resources/modems.routes';

export type Env = {
  DATABASE_URL: string;
}

const app = new Hono<{Bindings: Env}>();

app.route("/", modemsRoutes);

app.get('/', async (c) => {
	return c.text('Hello world ;)');
});

export default app;