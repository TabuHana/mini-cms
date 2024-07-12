import postgres from 'postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import * as schema from '@/server/db/schema';

declare global {
  // only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

if (process.env.NODE_ENV === 'production') {
  pg = postgres(process.env.DATABASE_URL as string);
  db = drizzle(pg, { schema });
} else {
  if (!global.db) {
    pg = postgres(process.env.DATABASE_URL!);
    global.db = drizzle(pg, { schema });
  }
  db = global.db;
}

export default db;
