import { httpClient } from '../db';
import { ModemRequest } from '../types/modems';
import { modems } from '../db/schema';
import { eq } from 'drizzle-orm';
import { CustomError } from '../utils/error';
import { cableModemResponseMapper } from '../utils/modem';

export async function getCableModems(baseUrl: string) {
  const client = httpClient(baseUrl);
  const response = await client.query.modems.findMany({
    columns: {
      id: true,
      name: true,
      description: true,
      status: true,
      validSince: true,
      tags: true,
    },
  });

  return response;
};

export async function createCableModem(baseUrl: string, body: ModemRequest) {
  const client = httpClient(baseUrl);
  const { 0: response } = await client.insert(modems).values({
    description: body.description,
    name: body.name,
    status: body.status,
    validSince: body.validSince,
    tags: body.tags,
  }).returning({
    id: modems.id,
    name: modems.name,
    description: modems.description,
    status: modems.status,
    validSince: modems.validSince,
    tags: modems.tags,
  });
  return response;
};

export async function getCableModemById(baseUrl: string, modemId: string) {
  const client = httpClient(baseUrl);

  const rows = await client.select()
    .from(modems)
    .where(eq(modems.id, modemId))

  if (rows.length > 0) {
    const { 0: cableModem } = rows;
    return cableModemResponseMapper(cableModem);
  }

  throw new CustomError('Cablemodem not found', 404);
}
