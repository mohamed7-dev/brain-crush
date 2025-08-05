import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import path from "path";

config({ path: ".env" });

const connectionString = process.env.DATABASE_URL!;
if (!connectionString)
  throw new Error(
    "CONFIG ERROR: DATABASE_URL must be a Neon postgres connection string!"
  );

export default defineConfig({
  dialect: "postgresql",
  schema: path.join(process.cwd(), "src", "server", "db", "schema.ts"),
  out: "./db/migration",
  dbCredentials: {
    url: connectionString,
  },
  verbose: true,
});
