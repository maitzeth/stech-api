import type { Context } from 'hono';
import { ZodError } from 'zod';

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

type HonoHandler = (context: Context<any, any, {}>) => Promise<Response> | Response;

export function withErrorHandling(handler: HonoHandler): HonoHandler {
  return async (context: Context<any, any, {}>) => {
    try {
      return await handler(context);
    } catch (error) {
      const errorMsg = (error as Error).message;

      if (error instanceof CustomError) {
        return context.json({ message: errorMsg }, error.status as any);
      } else if (error instanceof ZodError) {
        const errors = error.issues[0].message; // Always get the first error
        return context.json({ message: errors }, 400);
      }

      return context.json({ message: errorMsg }, 400);
    }
  };
}