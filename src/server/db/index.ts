import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "./schema";
import { isProduction } from "@/lib/utils";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing!!");
}

export const db = drizzle(connectionString, { logger: !isProduction, schema });
