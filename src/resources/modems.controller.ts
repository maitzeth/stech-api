import { httpClient } from '../db';

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
