import { httpClient } from '../db';
import { ModemRequest } from '../types/modems';
import { modems } from '../db/schema';
import { eq } from 'drizzle-orm';
import { CustomError } from '../utils/error';
import { cableModemResponseMapper } from '../utils/modem';

export async function getCableModems(dbUrl: string) {
  const client = httpClient(dbUrl);
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

export async function createCableModem(dbUrl: string, body: ModemRequest) {
  const client = httpClient(dbUrl);
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

export async function getCableModemById(dbUrl: string, modemId: string) {
  const client = httpClient(dbUrl);

  const rows = await client.select()
    .from(modems)
    .where(eq(modems.id, modemId))

  if (rows.length > 0) {
    const { 0: cableModem } = rows;
    return cableModemResponseMapper(cableModem);
  }

  throw new CustomError('Cablemodem not found', 404);
}

export async function updateCableModem(dbUrl: string, modemId: string, data: ModemRequest) {
  const client = httpClient(dbUrl);
  const { 0: updatedUserId } = await client.update(modems)
    .set({
      name: data.name,
      description: data.description,
      status: data.status,
      validSince: data.validSince,
      tags: data.tags,
      updatedAt: new Date(),
    })
    .where(eq(modems.id, modemId))
    .returning({ id: modems.id });
  
  return updatedUserId;
}

export async function deleteCableModem(dbUrl: string, modemId: string) {
  const client = httpClient(dbUrl);

  // For this use case i will delete the row.
  // But I was thinking about adding a new column name published: true/false
  // And update that value instead of delete the row for audit porpuses.
  const response = await client.delete(modems).where(eq(modems.id, modemId));

  if (response.rowCount === 0) {
    throw new CustomError('Cablemodem not found', 404);
  }
  
  return response;
}
