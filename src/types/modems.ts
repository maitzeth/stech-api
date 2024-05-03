import { modemBlueprint } from '../db/schema';
import { z } from 'zod';

export type Modem = z.infer<typeof modemBlueprint>;
export type ModemRequest = Omit<Modem, 'createdAt' | 'updatedAt' | 'id'>;