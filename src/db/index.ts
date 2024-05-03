import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
export function httpClient(baseUrl: string) {
  const sql = neon(baseUrl);

  const db = drizzle(sql, {
    schema,
  });

  return db;
} 