import { httpClient } from '../db';
import { ModemRequest } from '../types/modems';
import { modems } from '../db/schema';

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
}
