import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception'

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
        throw new HTTPException(error.status as any, { message: error.message });
      }

      throw new HTTPException(500, { message: errorMsg });
    }
  };
}