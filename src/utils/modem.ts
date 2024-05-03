import { Modem, ModemResponse } from '../types/modems'

export function cableModemResponseMapper(modem: Modem) {
  return {
    name: modem.name,
    description: modem.description,
    status: modem.status,
    validSince: modem.validSince,
    tags: modem.tags,
  } satisfies ModemResponse;
};
