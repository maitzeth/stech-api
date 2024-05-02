import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { NeonHttpDatabase, drizzle } from 'drizzle-orm/neon-http';

export class Client {
  private readonly sql: NeonQueryFunction<any, any>;
  readonly db: NeonHttpDatabase<Record<string, never>>;

  constructor(baseUrl: string | undefined) {
    if (!baseUrl) {
      throw new Error('DATABASE_URL environment variable is required');
    }

    this.sql = neon(baseUrl);
    this.db = drizzle(this.sql);
  }
};
