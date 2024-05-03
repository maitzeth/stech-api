import { json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const modems = pgTable('modems', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  status: text('status', { enum: ['active', 'suspended', 'provision'] }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  validSince: text('valid_since').notNull(),
  tags: json('tags').$type<string[]>().notNull(),
});

export const modemBlueprint = createInsertSchema(modems, {
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string',
  })
    .min(3, 'Please enter a name with at least 3 characters.')
    .max(50, 'Please enter a name with no more than 50 characters.'),
  description: z.string({
    required_error: 'description is required',
    invalid_type_error: 'description must be a string',
  })
    .min(10, 'Please enter a description with at least 10 characters.')
    .max(100, 'Please enter a description with no more than 100 characters.'),
  validSince: z.string({
    required_error: 'valid_since is required',
    invalid_type_error: 'valid_since must be a string',
  }),
  status: z.enum(['active', 'suspended', 'provision']),
  tags: z.string({
    required_error: 'tags is required',
    invalid_type_error: 'tags must be a string',
  }).array(),
});
