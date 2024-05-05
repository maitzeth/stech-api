import type {  Context, Next } from 'hono';
import { modemBlueprint } from '../db/schema'
import { ModemRequest } from '../types/modems';
import { HTTPException } from 'hono/http-exception'

export const validatePayload = async (c: Context<any, any, {}>, next: Next) => {
  const body = await c.req.json() as ModemRequest;

  const result = await modemBlueprint.safeParseAsync(body);

  if (!result.success) {
    const singleErrorMsg = result.error.issues[0].message;

    throw new HTTPException(400, { message:singleErrorMsg });
  }

  await next();
};

export const validateDateTime = async (c: Context<any, any, {}>, next: Next) => {
  const body = await c.req.json() as ModemRequest;

  const validSinceValue = body.validSince;

  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  const result = regex.test(validSinceValue);

  if (!result) {
    throw new HTTPException(400, { message: 'Invalid validSince value' });
  }

  await next();
}