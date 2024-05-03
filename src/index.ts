import { Hono } from 'hono';
import { cors } from 'hono/cors'

import modemsRoutes from './resources/modems.routes';

export type Env = {
  DATABASE_URL: string;
}

const app = new Hono<{Bindings: Env}>();

app.use(cors({
  origin: '*', // Permitir acceso desde cualquier origen
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
}));

app.route("/", modemsRoutes);

app.get('/', async (c) => {
	return c.text('Hello world ;)');
});

export default app;